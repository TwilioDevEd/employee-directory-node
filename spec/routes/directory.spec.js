'use strict';

var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app')
  , mongoose = require('mongoose')
  , config = require('../../config')
  , Employee = require('../../models/employee')
  , employees = require('../../data');

describe('directory route', function () {
  before(function (done) {
    mongoose.connect(config.dbConnection, done);
  });

  after(function (done) {
    mongoose.disconnect(done);
  });

  describe('POST /directory/search/', function () {
    beforeEach(function (done) {
      Employee.remove({}, function() {
        Employee.create(employees, function(err, result) {
          done();
        });
      });
    });

    it('should return not found', function (done) {
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

    it('should return a single employee', function (done) {
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

    it('should return multiple employees', function (done) {
      var testApp = supertest(app);
      testApp.post('/directory/search/')
        .send({
          Body: 'Thor'
        })
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.text);
          expect($('message').text()).to.equal(
            'We found multiple people, reply with:\n' +
            '1 for Thor Girl\n' +
            '2 for Frog Thor\n' +
            '3 for Thor\n' +
            'Or start over'
          );
          done();
        });
    });

    it('should return multiple employees and choose Thor', function (done) {
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
            var $ = cheerio.load(res.text);
            expect($('body').text()).to.equal('Thor\n+14155559999\nthor@asgard.example.com');
            expect($('media').text()).to.equal('http://i.imgur.com/kXi5u8w.jpg');
            done();
          });
      });
    });
  });
});
