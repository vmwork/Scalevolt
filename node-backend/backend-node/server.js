import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLiqPayForm } from './src/api/order/controllers/liqpayController.js';

// Load environment variables
dotenv.config();

// __dirname setup for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(__dirname));

// Serve the test HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-stripe.html'));
});


// ✅ STRIPE CHECKOUT
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail, locale = 'en', currency = 'pln' } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required and must be a non-empty array' });
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name || 'Unnamed Product',
          images: item.image ? [item.image] : [],
          description: item.description || '',
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.quantity || 1,
    }));

    const orderId = `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24', 'blik'],
      line_items: lineItems,
      mode: 'payment',
      locale: locale,
      success_url: `${process.env.DOMAIN || 'http://localhost:8080'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN || 'http://localhost:8080'}/checkout/cancel`,
      customer_email: customerEmail,
      payment_intent_data: {
        description: 'Order from Clean Energy Store',
        metadata: {
          order_id: orderId,
          customer_email: customerEmail
        },
      },
      shipping_address_collection: {
        allowed_countries: ['PL'],
      },
    });

    res.json({ id: session.id, order_id: orderId });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});


// ✅ LIQPAY GENERATE HTML
app.post('/api/liqpay/generate', async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const html = createLiqPayForm(amount, orderId);
    res.json({ html });
  } catch (error) {
    console.error('LiqPay error:', error);
    res.status(500).json({ error: error.message });
  }
});


// Start server
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Stripe test: http://localhost:${PORT}/`);
});
