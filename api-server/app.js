const express = require('express');
const statsRoutes = require('./routes/stats');
require('./subscribers/natsSubscriber');

const app = express();
app.use(express.json());

app.use('/stats', statsRoutes);
app.use('/deviation', statsRoutes);

module.exports = app;
