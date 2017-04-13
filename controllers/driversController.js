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

  create(req, res) {
      Driver.create(req.body)
          .then(driver => res.send(driver));
  }
};
