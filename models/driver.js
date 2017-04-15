const mongoose = require('mongoose');
const pointSchema = require('./geometry');

const driverSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    geometry: pointSchema
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;