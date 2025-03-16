// routes/productRoutes.js

import { Router } from 'express';
import { pool } from '../db/pool.js'; // or wherever you export your pg pool

const router = Router();

// Create a product
router.post('/', async (req, res) => {
  const { name, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating product');
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

// NEW: Search products endpoint
router.get('/search', async (req, res) => {
  const query = req.query.q || '';
  console.log(`Searching for products with query: "${query}"`);
  
  try {
    // Using ILIKE for case-insensitive search in PostgreSQL
    // Searching in both name and any other relevant fields
    const result = await pool.query(
      `SELECT * FROM products 
       WHERE name ILIKE $1 
       OR description ILIKE $1
       OR CAST(id AS TEXT) ILIKE $1
       ORDER BY name ASC
       LIMIT 20`,
      [`%${query}%`]
    );
    
    console.log(`Found ${result.rows.length} products matching the search query`);
    res.json(result.rows);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ 
      error: 'Error searching products',
      message: err.message 
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching product');
  }
});

// Update product
router.put('/:id', async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [name, price, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting product');
  }
});

export default router;