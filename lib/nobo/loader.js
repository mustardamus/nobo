var config = require('../../config');

var loader = {
  require: function(modules) {
    for(i in modules) {
      var parts = modules[i].url.split('/'),
          last  = parts[parts.length-1],
          repo  = last || parts[parts.length-2],
          path  = modules[i].path || '';

      require.paths.unshift(config.root+'/lib/'+repo+'/'+path);
    }
  }
}

exports.require = loader.require;