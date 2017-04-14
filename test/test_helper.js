const mongoose = require('mongoose');

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
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
        .then(() => done())
        .catch(() => done());
});