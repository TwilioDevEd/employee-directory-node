'use strict';

var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app')
  , mongoose = require('mongoose')
  , config = require('../../config')
  , Employee = require('../../models/employee')
  , employees = require('../../models/seed-data');

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
      testApp
        .post('/directory/search/')
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
      testApp
        .post('/directory/search/')
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
  });
});
