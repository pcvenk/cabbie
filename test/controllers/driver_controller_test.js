const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const Driver = mongoose.model('Driver');
const app = require('../../app');


describe('Driver controller', () => {
    it('POST to /api/drivers creates a driver', (done) => {
        //no drivers created yet
        Driver.count()
            .then((result) => {
                request(app)
                    .post('/api/driver')
                    .send({email: 'testdriver@td.com'})
                    .end(() => {
                        //new driver created with the example email
                        Driver.count()
                            .then((newResult) => {
                                assert(result + 1 === newResult);
                                done();
                            });
                    });
            });
    });
});