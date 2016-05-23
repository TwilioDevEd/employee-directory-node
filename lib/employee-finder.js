var Employee = require('../models/employee');

var findByName = function(name, callback) {
  Employee.find({
    "fullName": {
      "$regex": name, "$options": "i"
    }
  }, callback);
};

var findById = function(id, callback) {
  Employee.findOne({
    "_id": id
  }, callback);
};

module.exports.findByName = findByName;
module.exports.findById = findById;
