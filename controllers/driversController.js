const Driver = require('../models/driver');

module.exports = {

    //  ES6 syntax
    greeting(req, res) {
        res.send({hi: 'there'});
    },

    //  ES5 syntax
    // greeting: function(req, res){
    //     res.send({hi: 'there'});
    // },

    // create(req, res) {
    //     Driver.create(req.body, (err, driver) => {
    //         if(err){
    //             res.status(422).send(err);
    //         } else {
    //             res.send(driver);
    //         }
    //     });
    // }
    create(req, res, next) {
        Driver.create(req.body)
            .then(newDriver => res.send(newDriver))
            .catch(next);
    },
    update(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
            .then(() => Driver.findById({_id: driverId}))
            .then((updatedDriver) => res.send(updatedDriver))
            .catch(next);
    },
    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove({ _id: driverId })
            .then((foundDriver) => res.status(204).send(foundDriver))
            .catch(next);
    }
};
