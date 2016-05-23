var mongoose = require('mongoose')
  , config = require('./config')
  , Employee = require('./models/employee')
  , employees = require('./models/seed-data.json')
  , _ = require('underscore');

mongoose.connect(config.dbConnection, function() {
  Employee.remove({}, function() {
    Employee.create(employees, function(err, result) {
      if (err) throw new Error(err);
      console.log('Data load succesfully!');
      mongoose.disconnect();
    });
  });
});
