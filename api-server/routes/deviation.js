const express = require('express');
const Stat = require('../models/Stat');

const router = express.Router();

// /deviation?coin=bitcoin
router.get('/', async (req, res) => {
  try {
    const coin = req.query.coin;
    const records = await Stat.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (records.length === 0) return res.status(404).json({ error: 'No data found' });

    const prices = records.map(r => r.price);
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.json({ deviation: +deviation.toFixed(2) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
