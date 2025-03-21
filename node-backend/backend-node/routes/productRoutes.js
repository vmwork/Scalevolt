// routes/productRoutes.js
import { Router } from 'express';
import { pool } from '../db/pool.js'; // or wherever you export your pg pool
const router = Router();

// Helper function to build searchable text
function buildSearchableText(product) {
  return [
    product.name, 
    product.name_uk, 
    product.name_pl,
    product.description, 
    product.description_uk, 
    product.description_pl
  ].filter(Boolean).join(' ').toLowerCase();
}

// Create a product
router.post('/', async (req, res) => {
  const { 
    name, price, description,
    name_uk, name_pl,
    description_uk, description_pl 
  } = req.body;
  
  try {
    // Build searchable text for full-text search
    const searchable_text = buildSearchableText({
      name, name_uk, name_pl, 
      description, description_uk, description_pl
    });
    
    const result = await pool.query(
      `INSERT INTO products 
       (name, price, description, name_uk, name_pl, description_uk, description_pl, searchable_text) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [name, price, description, name_uk, name_pl, description_uk, description_pl, searchable_text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating product');
  }
});

// Get all products
router.get('/', async (req, res) => {
  const lang = req.query.lang || 'en'; // Default to English
  
  try {
    let result;
    if (lang === 'en') {
      // Return default fields for English
      result = await pool.query('SELECT * FROM products');
    } else if (lang === 'uk') {
      // Return Ukrainian translations where available
      result = await pool.query(`
        SELECT 
          id, 
          COALESCE(name_uk, name) as name, 
          price, 
          COALESCE(description_uk, description) as description,
          created_at, 
          updated_at
        FROM products
      `);
    } else if (lang === 'pl') {
      // Return Polish translations where available
      result = await pool.query(`
        SELECT 
          id, 
          COALESCE(name_pl, name) as name, 
          price, 
          COALESCE(description_pl, description) as description,
          created_at, 
          updated_at
        FROM products
      `);
    } else {
      // Default to all fields
      result = await pool.query('SELECT * FROM products');
    }
    
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
});

// NEW: Search products endpoint
router.get('/search', async (req, res) => {
  const query = req.query.q || '';
  const lang = req.query.lang || 'en';
  
  console.log(`Searching for products with query: "${query}" in language: ${lang}`);
  
  try {
    let result;
    
    if (query.trim() === '') {
      // If empty query, return all products
      result = await pool.query('SELECT * FROM products ORDER BY name ASC LIMIT 20');
    } else {
      // If searchable_text column exists, use it
      try {
        result = await pool.query(
          `SELECT * FROM products
           WHERE searchable_text ILIKE $1
           ORDER BY name ASC
           LIMIT 20`,
          [`%${query}%`]
        );
      } catch (err) {
        // Fallback to original search if searchable_text doesn't exist yet
        console.log('Falling back to original search method');
        result = await pool.query(
          `SELECT * FROM products
           WHERE name ILIKE $1
           OR description ILIKE $1
           OR CAST(id AS TEXT) ILIKE $1
           ORDER BY name ASC
           LIMIT 20`,
          [`%${query}%`]
        );
      }
    }
    
    // Format the results based on requested language
    let formattedResults = result.rows;
    
    if (lang === 'uk') {
      formattedResults = result.rows.map(product => ({
        ...product,
        name: product.name_uk || product.name,
        description: product.description_uk || product.description
      }));
    } else if (lang === 'pl') {
      formattedResults = result.rows.map(product => ({
        ...product,
        name: product.name_pl || product.name,
        description: product.description_pl || product.description
      }));
    }
    
    console.log(`Found ${formattedResults.length} products matching the search query`);
    res.json(formattedResults);
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
  const lang = req.query.lang || 'en';
  
  try {
    let result;
    
    if (lang === 'en') {
      result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    } else if (lang === 'uk') {
      result = await pool.query(`
        SELECT 
          id, 
          COALESCE(name_uk, name) as name, 
          price, 
          COALESCE(description_uk, description) as description,
          created_at, 
          updated_at
        FROM products WHERE id = $1
      `, [id]);
    } else if (lang === 'pl') {
      result = await pool.query(`
        SELECT 
          id, 
          COALESCE(name_pl, name) as name, 
          price, 
          COALESCE(description_pl, description) as description,
          created_at, 
          updated_at
        FROM products WHERE id = $1
      `, [id]);
    } else {
      result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    }
    
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
  const { 
    name, price, description,
    name_uk, name_pl,
    description_uk, description_pl 
  } = req.body;
  const { id } = req.params;
  
  try {
    // Check if the product exists
    const existingProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (existingProduct.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    
    // Combine existing product data with new data
    const product = {
      ...existingProduct.rows[0],
      name: name || existingProduct.rows[0].name,
      price: price || existingProduct.rows[0].price,
      description: description || existingProduct.rows[0].description,
      name_uk: name_uk || existingProduct.rows[0].name_uk,
      name_pl: name_pl || existingProduct.rows[0].name_pl,
      description_uk: description_uk || existingProduct.rows[0].description_uk,
      description_pl: description_pl || existingProduct.rows[0].description_pl
    };
    
    // Build searchable text
    const searchable_text = buildSearchableText(product);
    
    // Update the product
    const result = await pool.query(
      `UPDATE products SET 
         name = COALESCE($1, name), 
         price = COALESCE($2, price),
         description = COALESCE($3, description),
         name_uk = COALESCE($4, name_uk),
         name_pl = COALESCE($5, name_pl),
         description_uk = COALESCE($6, description_uk),
         description_pl = COALESCE($7, description_pl),
         searchable_text = $8
       WHERE id = $9 
       RETURNING *`,
      [name, price, description, name_uk, name_pl, description_uk, description_pl, searchable_text, id]
    );
    
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

// ADD: Translation-specific endpoint
router.patch('/:id/translations', async (req, res) => {
  const { id } = req.params;
  const { name_uk, name_pl, description_uk, description_pl } = req.body;
  
  try {
    // Get current product data
    const currentProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (currentProduct.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    
    // Combine existing and new data
    const product = {
      ...currentProduct.rows[0],
      name_uk: name_uk !== undefined ? name_uk : currentProduct.rows[0].name_uk,
      name_pl: name_pl !== undefined ? name_pl : currentProduct.rows[0].name_pl,
      description_uk: description_uk !== undefined ? description_uk : currentProduct.rows[0].description_uk,
      description_pl: description_pl !== undefined ? description_pl : currentProduct.rows[0].description_pl
    };
    
    // Build searchable text
    const searchable_text = buildSearchableText(product);
    
    // Update only translation fields
    const result = await pool.query(
      `UPDATE products SET 
         name_uk = COALESCE($1, name_uk),
         name_pl = COALESCE($2, name_pl),
         description_uk = COALESCE($3, description_uk),
         description_pl = COALESCE($4, description_pl),
         searchable_text = $5
       WHERE id = $6 
       RETURNING *`,
      [name_uk, name_pl, description_uk, description_pl, searchable_text, id]
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating translations');
  }
});

export default router;