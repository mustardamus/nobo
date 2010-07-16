var config  = require('../../config'),
    sys     = require('sys');

var logger = {
  debug: function(message) {
    if(config.debug) sys.puts('DEBUG: '+message);
  }
}

exports.debug = logger.debug;