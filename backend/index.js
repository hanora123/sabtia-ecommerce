const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 8000;

let defaultVendorId = null;

// Function to fetch the first vendor ID on startup
async function fetchDefaultVendorId() {
  try {
    const { rows } = await db.query('SELECT id FROM vendors LIMIT 1');
    if (rows.length > 0) {
      defaultVendorId = rows[0].id;
      console.log(`Using default vendor ID: ${defaultVendorId}`);
    } else {
      console.warn('No vendors found in the database. Product creation might fail.');
    }
  } catch (err) {
    console.error('Error fetching default vendor ID:', err.message);
  }
}

// Fetch default vendor ID when the server starts
fetchDefaultVendorId();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    let query = 'SELECT * FROM products';
    if (req.query.featured) {
      query += ' WHERE is_featured = true';
    }
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET all vendors
app.get('/api/vendors', async (req, res) => {
  try {
    let query = 'SELECT * FROM vendors';
    if (req.query.top) {
      query += ' ORDER BY rating DESC LIMIT 3'; // Get top 3 vendors
    }
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET all categories
app.get('/api/categories', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(
      'SELECT p.*, v.shop_name, v.shop_logo FROM products p JOIN vendors v ON p.vendor_id = v.id WHERE p.id = $1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET similar products
app.get('/api/products/:id/similar', async (req, res) => {
  try {
    const { id } = req.params;
    // First, get the category of the current product
    const { rows: productRows } = await db.query('SELECT category_id FROM products WHERE id = $1', [id]);
    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const { category_id } = productRows[0];

    // Then, get other products in the same category
    const { rows: similarProducts } = await db.query(
      'SELECT * FROM products WHERE category_id = $1 AND id != $2 LIMIT 4',
      [category_id, id]
    );

    res.json(similarProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new product
app.post('/api/products', async (req, res) => {
  const { name_ar, name_en, description_ar, description_en, price, original_price, stock_quantity, category_id, images, specifications } = req.body;

  if (!defaultVendorId) {
    return res.status(500).json({ error: 'Server not configured with a default vendor ID.' });
  }

  // Basic validation
  if (!name_ar || !name_en || !price || !category_id) {
    return res.status(400).json({ error: 'Missing required product fields: name_ar, name_en, price, category_id' });
  }

  try {
    const { rows } = await db.query(
      'INSERT INTO products (vendor_id, category_id, name_ar, name_en, description_ar, description_en, price, original_price, stock_quantity, images, specifications) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING * ',
      [defaultVendorId, category_id, name_ar, name_en, description_ar, description_en, price, original_price, stock_quantity, images, specifications]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});
