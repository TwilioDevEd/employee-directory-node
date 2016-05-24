'use strict';

require('../spec-helper');

var expect = require('chai').expect
  , employeeFinder = require('../../lib/employee-finder')
  , Employee = require('../../models/employee')
  , spiderMan = {
      "_id": "1111702403e641a82afe1111",
      "fullName": "Spider-Man",
      "imageUrl": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
      "email": "Spider-Man@heroes.example.com",
      "phoneNumber": "+14155559610"
    }
  , ironMan = {
      "_id": "2222702403e641a82afe2222",
      "fullName": "Iron Man",
      "imageUrl": "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg",
      "email": "IronMan@heroes.example.com",
      "phoneNumber": "+14155559368"
    }
  , wolverine = {
      "_id": "3333702403e641a82afe3333",
      "fullName": "Wolverine",
      "imageUrl": "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf.jpg",
      "email": "Wolverine@heroes.example.com",
      "phoneNumber": "+14155559718"
    }
  , employees = [
      spiderMan,
      ironMan,
      wolverine
  ];

describe('employee-finder', function () {

  beforeEach(function (done) {
    Employee.remove({}, function() {
      Employee.create(employees, function(err, result) {
        done();
      });
    });
  });

  describe('#findById', function () {
    it('finds employee by id', function () {
      employeeFinder.findById('1111702403e641a82afe1111', function(err, doc) {
        expect(doc.fullName).to.equal('Spider-Man');
      });
    });
  });

  describe('#findByName', function () {
    it('finds employee by name', function () {
      employeeFinder.findByName('name', function(err, docs) {
        expect(docs).to.include(spiderMan);
        expect(docs).to.include(ironMan);
      }); 
    });
  });

});
