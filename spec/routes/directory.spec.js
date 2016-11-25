'use strict';

require('../spec-helper');

var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app')
  , Employee = require('../../models/employee')
  , employees = require('../../employees');

describe('directory route', function () {

  describe('POST /directory/search/', function () {
    beforeEach(function (done) {
      Employee.remove({}, function() {
        Employee.create(employees, function(err, result) {
          done();
        });
      });
    });

    it('returns not found', function (done) {
      var testApp = supertest(app);
      testApp.post('/directory/search/')
      .send({
        Body: 'Yyy'
      })
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.text);
        expect($('message').text()).to.equal('We did not find the employee you\'re looking for');
        done();
      });
    });

    it('returns a single employee', function (done) {
      var testApp = supertest(app);
      testApp.post('/directory/search/')
        .send({
          Body: 'Wolverine'
        })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.text);
          expect($('body').text()).to.equal('Wolverine\n+14155559718\nWolverine@heroes.example.com');
          expect($('media').text()).to.equal('http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf.jpg');
          done();
        });
    });

    it('returns multiple employees', function (done) {
      var testApp = supertest(app);
      testApp.post('/directory/search/')
        .send({
          Body: 'Thor'
        })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.text);
          expect($('message').text()).to.equal(
`We found multiple people, reply with:
1 for Frog Thor
2 for Thor
3 for Thor Girl
Or start over`
          );
          done();
        });
    });

    it('chooses Thor from multiples employees', function (done) {
      var testApp = supertest(app);
      Employee.findOne({'fullName': 'Thor'}, function(err, result) {
        var thorId = result.id.toString();
        testApp.post('/directory/search/')
          .send({
            Body: '1'
          })
          .set('Cookie', 'cachedEmployees=j%3A%7B%221%22%3A%22'+thorId+'%22%2C%222%22%3A%2257436471180bd66f5bae5e02%22%2C%223%22%3A%2257436471180bd66f5bae5d3e%22%7D')
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.headers['set-cookie'][0]).to.equal('cachedEmployees=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
            var $ = cheerio.load(res.text);
            expect($('body').text()).to.equal('Thor\n+14155559999\nthor@asgard.example.com');
            expect($('media').text()).to.equal('http://i.imgur.com/kXi5u8w.jpg');
            done();
          });
      });
    });

    it('chooses non existent number from multiple employees', function (done) {
      var testApp = supertest(app);
      Employee.findOne({'fullName': 'Thor'}, function(err, result) {
        var thorId = result.id.toString();
        testApp.post('/directory/search/')
          .send({
            Body: '10'
          })
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            var $ = cheerio.load(res.text);
            expect($('message').text()).to.equal('We did not find the employee you\'re looking for');
            done();
          });
      });
    });
  });
});
