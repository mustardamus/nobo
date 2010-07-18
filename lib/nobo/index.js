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
  fire: function() {
    logger.debug('nobo fired on http://localhost:'+config.port);
    
    http.createServer(function(request, response) {
      var uri             = url.parse(request.url),
          pathname        = uri.pathname,
          filename        = config.root+'/public/'+pathname,
          extension       = path.extname(filename),
          method          = request.method.toLowerCase();
          method          = method == 'delete' ? 'del' : method;
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
          nobo.beforeFunc(request, response);
          nobo.routes[method][pathname](request, response);
        } else {
          logger.debug('nobo couldn\'t handle '+pathname+' - sent 404');
          response.send(404, '404 Not Found', 'text');
        }
      });
    }).listen(config.port);
  },
  routes: {
    get: {},
    post: {},
    put: {},
    del: {}
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
  put: function(paths, callback) {
    nobo.addRoute('put', paths, callback);
  },
  del: function(paths, callback) {
    nobo.addRoute('del', paths, callback);
  },
  beforeFunc: null,
  before: function(callback) {
    nobo.beforeFunc = callback;
  }
}

exports.get     = nobo.get;
exports.post    = nobo.post;
exports.put     = nobo.put;
exports.del     = nobo.del;
exports.before  = nobo.before;
exports.fire    = nobo.fire;