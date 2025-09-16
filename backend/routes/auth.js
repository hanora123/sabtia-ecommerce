const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';
if (JWT_SECRET === 'your-default-secret') {
    console.warn('Warning: JWT_SECRET is not set. Using a default secret for development.');
}

// User registration (signup)
router.post('/signup', async (req, res) => {
    const { email, password, fullName, shopName } = req.body;

    if (!email || !password || !fullName || !shopName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const { rows: userRows } = await db.query(
            'INSERT INTO users (email, password_hash, full_name, user_type) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashedPassword, fullName, 'vendor']
        );
        const newUser = userRows[0];

        // Create vendor
        const { rows: vendorRows } = await db.query(
            'INSERT INTO vendors (user_id, shop_name) VALUES ($1, $2) RETURNING *',
            [newUser.id, shopName]
        );
        const newVendor = vendorRows[0];

        // Generate JWT
        const token = jwt.sign({ userId: newUser.id, vendorId: newVendor.id }, JWT_SECRET, { expiresIn: '1h' });

        // Set HttpOnly cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); // 1 hour

        res.status(201).json({ userId: newUser.id, vendorId: newVendor.id });

    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') { // Unique violation
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const { rows: userRows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userRows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = userRows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const { rows: vendorRows } = await db.query('SELECT * FROM vendors WHERE user_id = $1', [user.id]);
        const vendor = vendorRows[0];

        // Generate JWT
        const token = jwt.sign({ userId: user.id, vendorId: vendor?.id }, JWT_SECRET, { expiresIn: '1h' });

        // Set HttpOnly cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); // 1 hour

        res.json({ userId: user.id, vendorId: vendor?.id });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;