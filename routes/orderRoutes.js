const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/order');

// Save an order
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user._id,
      items: req.body.items,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Failed to save order:", err);
    res.status(500).json({ message: "Server error while saving order" });
  }
});

// Get orders for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ message: "Server error while fetching orders" });
  }
});

module.exports = router;
