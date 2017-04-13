const express = require('express');
const router = require('./router/routes');

const app = express();
router(app);

module.exports = app;
