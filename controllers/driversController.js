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
        const driverId = req.body.params;
        const driverProps = req.body;

        Driver.findByIdAndUpdate(driverId, driverProps)
            .then(() => Driver.findById({_id: driverId}))
            .then((updatedDriver) => res.send(updatedDriver))
            .catch(next);
    }

};
