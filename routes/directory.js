'use strict';

var express = require('express')
  , router = express.Router()
  , twilio = require('twilio')
  , employeeFinder = require('../lib/employee-finder')
  , _ =  require('underscore');

// POST /directory/search/
router.post('/search/', function(req, res, next) {
  var name = req.body.Body;
  employeeFinder.findByName(name, function(err, employees) {
    var resp = new twilio.TwimlResponse();
    if (employees.length == 0) {
      resp.message('We did not find the employee you\'re looking for');
    } else if (employees.length == 1) {
      var employee = employees[0];
      resp.message(function() {
        this.body(`${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`);
        this.media(employee.imageUrl);
      });
    } else {
      var options = _.chain(employees)
        .map(function(employee, index) {
          return `\n${index + 1} for ${employee.fullName}`;
        })
        .reduce(function(memo, employee) {
          return memo += employee;
        }).value();

      resp.message(`We found multiple people, reply with:${options}\nOr start over`);
    }
    res.type('text/xml');
    res.send(resp.toString());
  })
});

module.exports = router;
