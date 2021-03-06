              require('../modules');
var config  = require('../config'),
    request = require('request/lib/main'),
    assert  = require('assert'),
    sys     = require('sys');


assert.response = function(method, url, statusCode, contentType, inBody) {
  request({ uri: 'http://localhost:'+config.port+url, method: method }, function(error, response, body) {
    if(error) throw new Error(error);
    
    assert.equal(response.statusCode, statusCode);
    assert.equal(response.headers['content-type'], contentType);
    assert.notEqual(body.indexOf(inBody), -1);
    sys.puts('OK: '+method+' '+url+' '+statusCode+' '+contentType+' "'+inBody+'" found in body');
  });
}

assert.response('GET', '/', 200, 'text/html', 'something great');
assert.response('GET', '/index.html', 200, 'text/html', 'something great');
assert.response('GET', '/css/reset.css', 200, 'text/css', 'html,body');
assert.response('GET', '/css/main.less', 200, 'text/css', 'background: #eeeeee;');
assert.response('GET', '/js/main.js', 200, 'text/javascript', 'ready');
assert.response('GET', '/hello', 200, 'text/html', 'World');
assert.response('GET', '/notexistent', 404, 'text', '404');
assert.response('POST', '/say?word=kewl', 200, 'application/json', 'kewl');
assert.response('PUT', '/update', 200, 'text', 'awesome');
assert.response('DELETE', '/delete', 200, 'text', 'delete');
assert.response('GET', '/before', 200, 'text/html', 'yep');