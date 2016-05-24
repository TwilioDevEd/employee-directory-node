'use strict';

var express = require('express')
  , router = express.Router()
  , twilio = require('twilio')
  , employeeFinder = require('../lib/employee-finder')
  , _ =  require('underscore')
  , twimlGenerator = require('../lib/twiml-generator');

// POST /directory/search/
router.post('/search/', function(req, res, next) {
  var body = req.body.Body;
  res.type('text/xml');

  if (req.cookies.cachedEmployees !== undefined && !isNaN(body)) {
    var cachedEmployees = req.cookies.cachedEmployees;
    var employeeId = cachedEmployees[body];
    if (employeeId === undefined) {
      res.send(twimlGenerator.notFound().toString());
    } else {
      employeeFinder.findById(employeeId, function(err, employee) {
        res.clearCookie('cachedEmployees');
        res.send(twimlGenerator.singleEmployee(employee).toString());
      });
    }
  } else {
    employeeFinder.findByName(body, function(err, employees) {
      if (employees.length === 0) {
        res.send(twimlGenerator.notFound().toString());
      } else if (employees.length === 1) {
        res.send(twimlGenerator.singleEmployee(employees[0]).toString());
      } else {
        var options = _.map(employees, function(it, index) {
          return { option: index + 1, fullName: it.fullName, id: it.id };
        });
        var cachedEmployees = _.object(_.map(options, function(it) { return [it.option, it.id]; }));
        res.cookie('cachedEmployees', cachedEmployees, { maxAge: 1000 * 60 * 60 });

        res.send(twimlGenerator.multipleEmployees(options).toString());
      }
    });
  }
});

module.exports = router;
