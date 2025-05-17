const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stat', statSchema);
