const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const authenticateToken = require('./middleware');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/vendors/:id', authenticateToken);
app.use('/api/product-listings', authenticateToken);

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// GET all products (with search and lowest price)
app.get('/api/products', async (req, res) => {
  try {
    let queryParams = [];
    let query = `
      SELECT p.*, MIN(pl.price) as price
      FROM products p
      LEFT JOIN product_listings pl ON p.id = pl.product_id
    `;

    if (req.query.search) {
      queryParams.push(`%${req.query.search}%`);
      query += ' WHERE (p.name_en ILIKE $1 OR p.name_ar ILIKE $1)';
    }
    
    query += ' GROUP BY p.id';

    const { rows } = await db.query(query, queryParams);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET a single product by ID with all its listings
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: productRows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);

    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const product = productRows[0];

    const { rows: listingRows } = await db.query(
      `SELECT pl.*, v.shop_name, v.shop_logo, v.rating, v.total_reviews
       FROM product_listings pl
       JOIN vendors v ON pl.vendor_id = v.id
       WHERE pl.product_id = $1 AND pl.is_active = true`,
      [id]
    );

    product.listings = listingRows;
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new product to the catalog and a listing for it
app.post('/api/products', authenticateToken, async (req, res) => {
    const { name_ar, name_en, description_ar, description_en, category_id, images, specifications, price, stock_quantity } = req.body;
    const { vendorId } = req.user;

    if (!price || !stock_quantity) {
        return res.status(400).json({ error: 'Missing required fields for listing: price, stock_quantity' });
    }

    try {
        // Create the base product
        const { rows: productRows } = await db.query(
            'INSERT INTO products (category_id, name_ar, name_en, description_ar, description_en, images, specifications) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [category_id, name_ar, name_en, description_ar, description_en, images, specifications]
        );
        const newProduct = productRows[0];

        // Create the product listing
        const { rows: listingRows } = await db.query(
            'INSERT INTO product_listings (product_id, vendor_id, price, stock_quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [newProduct.id, vendorId, price, stock_quantity]
        );

        res.status(201).json({ ...newProduct, listing: listingRows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET a vendor's listings
app.get('/api/vendors/:id/listings', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query(
            `SELECT pl.*, p.name_en
             FROM product_listings pl
             JOIN products p ON pl.product_id = p.id
             WHERE pl.vendor_id = $1`,
            [id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// POST a new product listing for an existing product
app.post('/api/product-listings', async (req, res) => {
    const { product_id, price, stock_quantity } = req.body;
    const { vendorId } = req.user;

    if (!product_id || !price || !stock_quantity) {
        return res.status(400).json({ error: 'Missing required fields: product_id, price, stock_quantity' });
    }
    try {
        const { rows } = await db.query(
            'INSERT INTO product_listings (product_id, vendor_id, price, stock_quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [product_id, vendorId, price, stock_quantity]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// PUT (update) a product listing
app.put('/api/product-listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { price, stock_quantity, is_active } = req.body;
        const { rows } = await db.query(
            'UPDATE product_listings SET price = $1, stock_quantity = $2, is_active = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
            [price, stock_quantity, is_active, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product listing not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// DELETE a product listing
app.delete('/api/product-listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('DELETE FROM product_listings WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product listing not found' });
        }
        res.json({ message: 'Product listing deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
  console.log(`Backend server is listening on port ${port}`);
});