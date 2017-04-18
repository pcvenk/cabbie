const DriversController = require('../controllers/driversController');

module.exports = (app) => {
    app.get('/api', DriversController.greeting);

    //Create driver
    app.post('/api/driver', DriversController.create);

    //Update driver
    app.put('/api/driver/:id', DriversController.update);

    //Delete driver
    app.delete('/api/driver/:id', DriversController.delete);

    //Find driver based on location
    app.get('/api/driver', DriversController.index);

};
