const express = require('express');
const router = require('./router/routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

router(app);

module.exports = app;
