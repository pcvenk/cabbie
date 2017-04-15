const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const Driver = mongoose.model('Driver');
const app = require('../../app');


describe('Driver controller', () => {
    it('POST to /api/driver creates a driver', (done) => {
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

    it('PUT to /api/driver/:id updates a driver', (done) => {
        const driver = new Driver({ email: 'test123@test.com', driving: false });

        driver.save()
            .then(() => {
                request(app)
                    // .put('/api/driver/'+driver._id)
                    .put(`/api/driver/${driver._id}`)
                    .send({ driving: true })
                    .end(() => {
                        Driver.findOne({ email: 'test123@test.com' })
                            .then((foundDriver) => {
                                assert(foundDriver.driving === true);
                                done();
                            });
                    });
            });
    });
});