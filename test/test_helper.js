const mongoose = require('mongoose');
const Driver = require('../models/driver');

before(done => {
    mongoose.connect('mongodb://localhost/cabbie_test');
    mongoose.connection
        .once('open', () => {
            console.log('Good to go');
            done();
        })
        .on('error', () => {
            console.warn(err);
        });
});

beforeEach(done => {
    // const drivers = mongoose.connection.collections.drivers;
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
        .then(() => done())
        .catch(() => done());
});

// beforeEach(done => {
//     Driver.remove({})
//         .then(() => done())
//         .catch(() => done());
// });
//
// beforeEach(done => {
//     Driver.remove({}, () => {
//         done();
//     });
// });