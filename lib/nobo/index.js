                  require('../../modules');
var config      = require('../../config'),
    http        = require('http'),
    url         = require('url'),
    querystring = require('querystring'),
    path        = require('path'),
    sys         = require('sys'),
    logger      = require('./logger'),
    response2   = require('./response');
                  require('underscore');


var nobo = {
  routes: {},
  get: function(paths, callback) {
    if(_.isString(paths)) {
      nobo.routes[paths] = callback;
    } else {
      _.each(paths, function(path) {
        nobo.routes[path] = callback;
      });
    }
  },
  fire: function() {
    logger.debug('nobo fired on http://localhost:'+config.port);
    
    http.createServer(function(request, response) {
      var uri             = url.parse(request.url),
          pathname        = uri.pathname
          filename        = path.join(__dirname, '../../public/'+pathname),
          extension       = path.extname(filename),
          request.params  = querystring.parse(uri.query);
      
      for(var c in response2) { response[c] = response2[c]; }
      
      if(pathname == '/') {
        filename  += 'index.html';
        extension += '.html';
      }
      
      path.exists(filename, function(exists) {
        if(exists && config.fileTypes[extension]) {
          logger.debug('nobo served existing file '+pathname);
          response.sendFile(filename, config.fileTypes[extension]);
        } else if(nobo.routes[pathname]) {
          logger.debug('nobo processes route '+pathname);
          nobo.routes[pathname](request, response);
        } else {
          logger.debug('nobo couldn\'t handle '+pathname+' - sent 404');
          response.send(404, '404 Not Found', 'text');
        }
      });
    }).listen(config.port);
  }
}

exports.get   = nobo.get;
exports.fire  = nobo.fire;
exports.send  = nobo.send;