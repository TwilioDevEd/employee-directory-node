'use strict';

var config = {};

var dbConnection = function() {
  if (process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/test';
  }

  return 'mongodb://localhost/warm-transfer';
};

config.dbConnection = dbConnection();

module.exports = config;
