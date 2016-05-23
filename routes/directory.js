'use strict';

var express = require('express')
  , router = express.Router()
  , twilio = require('twilio');

// POST /directory/search/
router.post('/search/', function(req, res, next) {
  var resp = new twilio.TwimlResponse();
  resp.message('We did not find the employee you\'re looking for');
  res.type('text/xml');
  res.send(resp.toString());
});

module.exports = router;
