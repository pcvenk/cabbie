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

    it('DELETE to /api/driver/:id deletes a driver', (done) => {
        const driver = new Driver({ email: 't@t.com' });

        driver.save()
            .then(() => {
                request(app)
                    .delete(`/api/driver/${driver._id}`)
                    .send(driver)
                    .end(() => {
                        Driver.findOne({ _id: driver._id})
                            .then((foundDriver) => {
                                assert(foundDriver === null);
                                done();
                        });
                    });
            });
    });

    it('GET to /api/driver finds a driver based on its location', (done) => {
         const seatleDrvier = new Driver({
             email: 'seattle@test.com',
             geometry: {
                 type: 'Point',
                 coordinates: [-122.4759902, 47.6147628]
             }
         });

        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: {
                type: 'Point',
                coordinates: [-80.253, 25.791]
            }
        });

        Promise.all([ seatleDrvier.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    .get('/api/driver?lng=-80&lat=25')
                    .end((err, driver) => {
                        assert(driver.body.length === 1);
                        assert(driver.body[0].obj.email === 'miami@test.com');
                        done();
                    });
            });

    });
});