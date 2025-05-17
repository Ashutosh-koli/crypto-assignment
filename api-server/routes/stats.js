const express = require('express');
const Stat = require('../models/Stat');
const storeCryptoStats = require('../services/fetchCrypto');

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

// manual trigger: /stats/trigger
router.get('/trigger', async (req, res) => {
  await storeCryptoStats();
  res.send({ message: 'Data fetched manually' });
});

module.exports = router;
