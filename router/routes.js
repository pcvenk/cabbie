const DriversController = require('../controllers/driversController');

module.exports = (app) => {
    app.get('/api', DriversController.greeting);
};
