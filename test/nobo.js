              require('../modules');
var config  = require('../config'),
    request = require('request/lib/main'),
    assert  = require('assert'),
    sys     = require('sys');


assert.response = function(url, statusCode, contentType) {
  request({ uri: 'http://localhost:'+config.port+url }, function(error, response, body) {
    if(error) throw new Error(error);
    
    assert.equal(response.statusCode, statusCode);
    assert.equal(response.headers['content-type'], contentType);
    sys.puts('OK: '+url+' '+statusCode+' '+contentType);
  });
}

assert.response('/', 200, 'text/html');
assert.response('/index.html', 200, 'text/html');
assert.response('/css/reset.css', 200, 'text/css');
assert.response('/css/app.less', 200, 'text/css');
assert.response('/404', 404, 'text');