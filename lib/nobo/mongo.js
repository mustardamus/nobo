                 require('../../modules');
var config     = require('../../config'),
    mongoose   = require('mongoose').Mongoose,
    connection = mongoose.connect('mongodb://localhost/' + config.dbname);


var mongo = {
  model: function(name) {
    var model = require('../../models/' + name);
        model.init(mongoose);
        
    return connection.model(name);
  }
}

exports.model = mongo.model;