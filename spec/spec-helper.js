var mongoose = require('mongoose')
  , config = require('../config');

before(function (done) {
  mongoose.connect(config.dbConnection, done);
});

after(function (done) {
  mongoose.disconnect(done);
});
