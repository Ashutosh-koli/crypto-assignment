const express = require('express');
const Stat = require('../models/Stat');

const router = express.Router();

// /stats?coin=bitcoin
router.get('/', async (req, res) => {
  try {
    const coin = req.query.coin;
    const stat = await Stat.findOne({ coin }).sort({ timestamp: -1 });
    if (!stat) return res.status(404).send({ error: 'No data found' });

    res.json({
      price: stat.price,
      marketCap: stat.marketCap,
      '24hChange': stat.change24h
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// /deviation?coin=bitcoin
router.get('/deviation', async (req, res) => {
  try {
    const coin = req.query.coin;
    const records = await Stat.find({ coin }).sort({ timestamp: -1 }).limit(100);

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
