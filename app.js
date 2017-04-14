const express = require('express');
const router = require('./router/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/cabbie');
}


const app = express();

app.use(bodyParser.json());

router(app);

module.exports = app;
