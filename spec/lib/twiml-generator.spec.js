'use strict';

var expect = require('chai').expect
  , twimlGenerator = require('../../lib/twiml-generator')
  , cheerio = require('cheerio');

describe('twiml-generator', function () {

  describe('#notFound', function () {
    it('generates TwiML response when employee query gets nothing', function () {
      var twimlResponse = twimlGenerator.notFound();
      var $ = cheerio.load(twimlResponse.toString());
      expect($('Message').text()).to.equal('We did not find the employee you\'re looking for');
    });
  });

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

  describe('#multipleEmployees', function () {
    it('generates TwiML response for multiple employees', function () {
      var employees = [
        {
          'option': 1,
          'fullName' : 'Thor'
        },
        {
          'option': 2,
          'fullName' : 'Spider-man'
        },
        {
          'option': 3,
          'fullName' : 'Wolverine'
        }
      ];

      var twimlResponse = twimlGenerator.multipleEmployees(employees);
      var $ = cheerio.load(twimlResponse.toString());
      expect($('Message').text()).to.equal(
`We found multiple people, reply with:
1 for Thor
2 for Spider-man
3 for Wolverine
Or start over`);
    });
  });
});