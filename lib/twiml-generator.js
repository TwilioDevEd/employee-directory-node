'use strict';

var MessagingResponse = require('twilio').twiml.MessagingResponse,
  _ = require('underscore');

var notFound = function() {
  var resp = new MessagingResponse();
  resp.message('We did not find the employee you\'re looking for');
  return resp;
};

var singleEmployee = function(employee) {
  var resp = new MessagingResponse();
  var message = resp.message();
  message.body(`${employee.fullName}\n${employee.phoneNumber}\n${employee.email}`);
  message.media(employee.imageUrl);
  return resp;
};

var multipleEmployees = function(employees) {
  var resp = new MessagingResponse();
  var optionsMessage = _.reduce(employees, function(memo, it) {
    return memo += `\n${it.option} for ${it.fullName}`;
  }, '');

  resp.message(`We found multiple people, reply with:${optionsMessage}\nOr start over`);
  return resp;
};

module.exports.notFound = notFound;

module.exports.singleEmployee = singleEmployee;

module.exports.multipleEmployees = multipleEmployees;
