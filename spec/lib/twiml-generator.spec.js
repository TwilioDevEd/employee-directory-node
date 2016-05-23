'use strict';

var expect = require('chai').expect
  , twimlGenerator = require('../../lib/twiml-generator')
  , cheerio = require('cheerio')

describe('twiml-generator', function () {

  describe('#singleEmployee', function () {
    it('generates TwiML response with employee content', function () {
      var employee = {
        'fullName' : 'Thor',
        'imageUrl' : 'http://i.imgur.com/kXi5u8w.jpg',
        'email' : 'thor@asgard.example.com',
        'phoneNumber' : '+14155559999'
      };

      var twimlResponse = twimlGenerator.singleEmployee(employee);
      var $ = cheerio.load(twimlResponse.toString());
      expect($('Message Body').text()).to.equal('Thor\n+14155559999\nthor@asgard.example.com');
    });
  });

});