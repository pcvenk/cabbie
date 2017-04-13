const express = require('express');
const routes = require('./router/routes');

const app = express();
routes(app);

module.exports = app;
