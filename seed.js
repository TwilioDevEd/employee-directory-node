'use strict';

var mongoose = require('mongoose')
  , config = require('./config')
  , Employee = require('./models/employee')
  , employees = require('./employees')
  , _ = require('underscore');

mongoose.connect(config.dbConnection, function(err) {
  if (err) throw new Error(err);

  Employee.remove({}, function() {
    Employee.create(employees, function(err, result) {
      if (err) throw new Error(err);
      console.log('Data loaded succesfully!');
      mongoose.disconnect();
    });
  });
});
