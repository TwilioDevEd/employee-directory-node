'use strict';

var express = require('express')
  , router = express.Router()
  , twilio = require('twilio')
  , employeeFinder = require('../lib/employee-finder')
  , _ =  require('underscore');

// POST /directory/search/
router.post('/search/', function(req, res, next) {
  var body = req.body.Body;

  var resp = new twilio.TwimlResponse();
  if (parseInt(body)) {
    var cachedEmployees = req.cookies.cachedEmployees;
    employeeFinder.findById(cachedEmployees[body], function(err, employee) {
      resp.message(function() {
        this.body(`${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`);
        this.media(employee.imageUrl);
      });
      res.type('text/xml');
      res.send(resp.toString());
    });
    
  } else {
    employeeFinder.findByName(body, function(err, employees) {
      if (employees.length == 0) {
        resp.message('We did not find the employee you\'re looking for');
      } else if (employees.length == 1) {
        var employee = employees[0];
        resp.message(function() {
          this.body(`${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`);
          this.media(employee.imageUrl);
        });
      } else {
        var options = _.map(employees, function(employee, index) {
          var option = index + 1;
          return {
            option: option,
            fullName: employee.fullName,
            id: employee.id,
            message: `\n${option} for ${employee.fullName}`
          };
        });

        var optionsMessage = _.reduce(options, function(memo, it) {
          return memo += it.message;
        }, '');

        resp.message(`We found multiple people, reply with:${optionsMessage}\nOr start over`);

        var cachedEmployees = _.object(_.map(options, function(it){return [it.option, it.id]}));

        res.cookie('cachedEmployees', cachedEmployees, { maxAge: 1000 * 60 * 60 });
      }
      res.type('text/xml');
      res.send(resp.toString());
    });
  }
});

module.exports = router;
