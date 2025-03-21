// server.js
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables into process.env

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import Stripe from 'stripe';
import axios from 'axios';

// Import routes
import productRoutes from './routes/productRoutes.js';
import quoteRequestRoutes from './routes/quoteRequestRoutes.js';

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15', // or any version you need
});

// Use CORS to allow requests from your frontend domains
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://localhost:1337', 'http://localhost:8080'] 
}));

// Use JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static images from 'public/images'
app.use('/images', express.static('public/images'));

// Mount product routes at /api/products
app.use('/api/products', productRoutes);
app.use('/api/quote-requests', quoteRequestRoutes);

// Serve static files from the frontend's dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// PostgreSQL Pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Export pool for use in other modules
export const dbPool = pool;

// Test the connection
pool.query('SELECT NOW()', (err, dbRes) => {
  if (err) {
    console.error('Error testing DB connection:', err);
  } else {
    console.log('DB Connection test successful, current time:', dbRes.rows[0].now);
  }
});

// ------------------- ROUTES ------------------- //

// 1) Carousel Slides
app.get('/api/carousel-slides', (req, res) => {
  const carouselSlides = [
    {
      image: '/images/slide1.jpg',
      title: 'Slide 1',
      description: 'Description for Slide 1',
    },
    {
      image: '/images/slide2.jpg',
      title: 'Slide 2',
      description: 'Description for Slide 2',
    },
    {
      image: '/images/slide3.jpg',
      title: 'Slide 3',
      description: 'Description for Slide 3',
    },
  ];
  res.json(carouselSlides);
});

// 2) Stripe Checkout
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout-success',
      cancel_url: 'http://localhost:3000/checkout-cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'An error occurred during checkout session creation' });
  }
});

// 3) Init DB
app.get('/init-db', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `);
    res.send('Table "users" created (if it did not exist).');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating table.');
  }
});

// ADD Strapi-compatible API endpoints
// This allows your frontend to continue using the Strapi syntax without modification
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    // Format response to match Strapi's format
    const formattedProducts = {
      data: result.rows.map(product => ({
        id: product.id,
        attributes: {
          general_information: {
            name: product.name,
            description: product.description,
            images: { data: [{ attributes: { url: product.image_url } }] }
          },
          pricing_and_inventory: {
            price: product.price,
            stock_quantity: product.stock
          },
          categories: { data: [{ attributes: { name: product.category } }] }
        }
      }))
    };
    res.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// 4) Personalized Recommendations Route
app.get('/api/personalized-recs/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const pythonServiceUrl = 'http://localhost:8000/recommendations';
    // or the actual domain/IP of your Python container

    const response = await axios.post(pythonServiceUrl, {
      user_id: userId,
    });

    res.json(response.data); // response.data should have { recommendations: [...] }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching recommendations');
  }
});

// ADD route for Strapi-compatible promotions endpoint
app.get('/api/promotions', async (req, res) => {
  try {
    // Query based on any filters passed
    const result = await pool.query('SELECT * FROM promotions WHERE active = true');
    
    // Format response to match Strapi's format
    const formattedPromotions = {
      data: result.rows.map(promo => ({
        id: promo.id,
        attributes: {
          title: promo.title,
          description: promo.description,
          active: promo.active,
          image: { data: { attributes: { url: promo.image_url } } }
        }
      }))
    };
    res.json(formattedPromotions);
  } catch (error) {
    console.error('Error fetching promotions:', error);
    res.status(500).json({ error: 'Error fetching promotions' });
  }
});

// ADD route for Strapi-compatible ads endpoint
app.get('/api/ads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ads WHERE active = true');
    
    // Format response to match Strapi's format
    const formattedAds = {
      data: result.rows.map(ad => ({
        id: ad.id,
        attributes: {
          title: ad.title,
          description: ad.description,
          active: ad.active,
          image: { data: { attributes: { url: ad.image_url } } }
        }
      }))
    };
    res.json(formattedAds);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ error: 'Error fetching ads' });
  }
});

// 5) Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ------------------- START SERVER ------------------- //

const PORT = process.env.PORT || 1337; // Change default to 1337 to match frontend expectations
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}/api`);
});