const express = require('express');
const statsRoutes = require('./routes/stats');
const deviationRoutes = require('./routes/deviation');
require('./subscribers/natsSubscriber');

const app = express();
app.use(express.json());

app.use('/stats', statsRoutes);
app.use('/deviation', deviationRoutes);

module.exports = app;
