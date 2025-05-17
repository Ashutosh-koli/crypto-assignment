const { connect } = require('nats');
const storeCryptoStats = require('../services/fetchCrypto');
require('dotenv').config();

(async () => {
  const nc = await connect({ servers: process.env.NATS_URL });
  console.log('API Server connected to NATS');

  const sub = nc.subscribe('crypto.update');
  for await (const msg of sub) {
    const data = JSON.parse(msg.data);
    if (data.trigger === 'update') {
      await storeCryptoStats();
    }
  }
})();
