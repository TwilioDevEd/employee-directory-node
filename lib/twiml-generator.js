'use strict';

var twilio = require('twilio');

var singleEmployee = function(employee) {
  var resp = new twilio.TwimlResponse();
  resp.message(function() {
    this.body(`${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`);
    this.media(employee.imageUrl);
  });
  return resp;
};

module.exports.singleEmployee = singleEmployee;
