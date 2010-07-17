              require('../modules');
var config  = require('../config'),
    request = require('request/lib/main'),
    assert  = require('assert'),
    sys     = require('sys');


assert.response = function(url, statusCode, contentType, inBody) {
  request({ uri: 'http://localhost:'+config.port+url }, function(error, response, body) {
    if(error) throw new Error(error);
    
    assert.equal(response.statusCode, statusCode);
    assert.equal(response.headers['content-type'], contentType);
    assert.notEqual(body.indexOf(inBody), -1);
    sys.puts('OK: '+url+' '+statusCode+' '+contentType+' "'+inBody+'" found in body');
  });
}

assert.response('/', 200, 'text/html', 'something great');
assert.response('/index.html', 200, 'text/html', 'something great');
assert.response('/css/reset.css', 200, 'text/css', 'html,body');
assert.response('/css/app.less', 200, 'text/css', 'background: #eeeeee;');
assert.response('/js/app.js', 200, 'text/javascript', 'ready');
assert.response('/hello', 200, 'text/html', 'World');
assert.response('/notexistent', 404, 'text', '404');