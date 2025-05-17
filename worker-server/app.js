const { connect } = require('nats');
const cron = require('node-cron');
require('dotenv').config();

async function startWorker() {
  const nc = await connect({ servers: 'localhost:4222' });
  console.log('✅ Connected to NATS (worker)');

  setInterval(() => {
    nc.publish('crypto.update', Buffer.from(JSON.stringify({ trigger: 'update' })));
    console.log('📤 Published update event');
  }, 15 * 60 * 1000); // every 15 minutes
}

startWorker().catch(console.error);