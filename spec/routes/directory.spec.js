'use strict';

var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app')
  , mongoose = require('mongoose')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , config = require('../../config')
  , Employee = require('../../models/employee')
  , employees = require('../../models/seed-data')
  ;

describe('directory route', function () {
  before(function (done) {
    mongoose.connect(config.dbConnection, done);
  });

  after(function (done) {
    mongoose.disconnect(done);
  });

  describe('POST /directory/search/', function () {
    beforeEach(function (done) {
      Employee.remove({}, done);
    });

    it('responds with 200', function (done) {
      Employee.create(employees, function(err, result) {
        var testApp = supertest(app);
        testApp
          .post('/directory/search/')
          .expect(200, done);
      })
    });
  });
});