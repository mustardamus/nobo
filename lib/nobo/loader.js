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

/*
var sys     = require('sys'),
    spawn   = require('child_process').spawn,
    command = spawn('echo', ['git clone http://github.com/cloudhead/less.js.git']),
    output  = '';

command.stdout.addListener('data', function(data) {
  output += data;
});

command.addListener('exit', function(code) {
  //sys.puts(output);
});
*/