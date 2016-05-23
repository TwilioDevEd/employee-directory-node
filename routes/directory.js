'use strict';

var express = require('express')
  , router = express.Router()
  , twilio = require('twilio')
  , employeeFinder = require('../lib/employee-finder');

// POST /directory/search/
router.post('/search/', function(req, res, next) {
  var name = req.body.Body;
  console.log(name);
  employeeFinder.findByName(name, function(err, result) {
    var resp = new twilio.TwimlResponse();
    if (result.length == 0) {
      resp.message('We did not find the employee you\'re looking for');
    } else if (result.length == 1) {
      var employee = result[0];
      resp.message(function() {
        this.body(`${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`);
        this.media(employee.imageUrl);
      });
    }
    res.type('text/xml');
    res.send(resp.toString());
  })
});

module.exports = router;
