var Employee = require('../models/employee');

var findByName = function(name, callback) {
  Employee.find({
    "fullName": {
      "$regex": name, "$options": "i"
    }
  }, callback);
};

module.exports.findByName = findByName;
