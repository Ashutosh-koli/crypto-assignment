const { connect } = require('nats');
const cron = require('node-cron');
require('dotenv').config();

(async () => {
  const nc = await connect({ servers: process.env.NATS_URL });
  console.log('Worker Server connected to NATS');

  cron.schedule('*/15 * * * *', () => {
    nc.publish('crypto.update', JSON.stringify({ trigger: 'update' }));
    console.log('Published update event');
  });
})();
