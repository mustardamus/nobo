                  require('../../modules');
var config      = require('../../config'),
    http        = require('http'),
    url         = require('url'),
    querystring = require('querystring'),
    path        = require('path'),
    logger      = require('./logger'),
    response2   = require('./response'),
    sys         = require('sys');
                  require('underscore');


var nobo = {
  routes: {
    get: {},
    post: {}
  },
  addRoute: function(stack, paths, callback) {
    if(_.isString(paths)) {
      nobo.routes[stack][paths] = callback;
    } else {
      _.each(paths, function(path) {
        nobo.routes[stack][path] = callback;
      });
    }
  },
  get: function(paths, callback) {
    nobo.addRoute('get', paths, callback);
  },
  post: function(paths, callback) {
    nobo.addRoute('post', paths, callback);
  },
  fire: function() {
    logger.debug('nobo fired on http://localhost:'+config.port);
    
    http.createServer(function(request, response) {
      var uri             = url.parse(request.url),
          pathname        = uri.pathname,
          filename        = path.join(__dirname, '../../public/'+pathname),
          extension       = path.extname(filename),
          method          = request.method.toLowerCase();
          request.params  = querystring.parse(uri.query);
      
      for(var c in response2) { response[c] = response2[c]; }
      
      if(pathname == '/') {
        filename  += 'index.html';
        extension += '.html';
      }
      
      path.exists(filename, function(exists) {
        if(exists && config.fileTypes[extension]) {
          if(config.packAssets && extension == '.html') {
            logger.debug('nobo packed assets in '+pathname);
            response.sendPackedHtml(filename);
          } else {
            if(extension == '.less') {
              logger.debug('nobo compiled '+pathname+' with less');
              response.sendLess(filename);
            } else {
              logger.debug('nobo served existing file '+pathname);
              response.sendFile(filename, config.fileTypes[extension]);
            }
          }
        } else if(nobo.routes[method][pathname]) {
          logger.debug('nobo processes '+method.toUpperCase()+' route '+pathname);
          nobo.routes[method][pathname](request, response);
        } else {
          logger.debug('nobo couldn\'t handle '+pathname+' - sent 404');
          response.send(404, '404 Not Found', 'text');
        }
      });
    }).listen(config.port);
  }
}

exports.get   = nobo.get;
exports.post  = nobo.post;
exports.fire  = nobo.fire;