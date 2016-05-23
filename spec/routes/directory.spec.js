'use strict';

var expect = require('chai').expect
  , supertest = require('supertest')
  , cheerio = require('cheerio')
  , app = require('../../app')
  , mongoose = require('mongoose')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , config = require('../../config');

describe('directory route', function () {
  before(function (done) {
    mongoose.connect(config.dbConnection, done);
  });

  after(function (done) {
    mongoose.disconnect(done);
  });

  describe('POST /directory/search/', function () {
    it('responds with 200', function (done) {
      var testApp = supertest(app);
      testApp
        .post('/directory/search/')
        .expect(200, done);
    });
  });
});