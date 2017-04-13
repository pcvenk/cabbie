const DriversController = require('../controllers/driversController');

module.exports = (app) => {
    app.get('/api', DriversController.greeting);

    //Create driver
    app.post('/api/driver', DriversController.create);
};
