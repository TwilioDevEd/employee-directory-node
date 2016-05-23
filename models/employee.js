'use strict';

var mongoose = require('mongoose');

var Employee = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  imageUrl: String
});

module.exports = mongoose.model('employee', Employee);
