// services/storeCryptoStats.js

const axios = require('axios');
const Stat = require('../models/Stat');

const COINS = ['bitcoin', 'ethereum', 'matic-network'];

async function storeCryptoStats() {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: COINS.join(','),
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_change: true
        }
      }
    );

    const data = response.data;
    const timestamp = new Date();

    const stats = COINS.map(coin => ({
      coin,
      price: data[coin].usd,
      marketCap: data[coin].usd_market_cap,
      change24h: data[coin].usd_24h_change,
      timestamp
    }));

    await Stat.insertMany(stats);
    console.log('✅ Real-time stats saved:', timestamp.toISOString());
  } catch (error) {
    console.error('❌ Error fetching/storing crypto stats:', error.message);
  }
}

module.exports = storeCryptoStats;
