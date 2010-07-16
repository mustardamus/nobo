                  require('./modules');
var nobo        = require('nobo'),
    sys         = require('sys');
                  require('underscore');


nobo.get('/whatever', function(request, response) {
  response.sendHtml(sys.inspect(request));
});

nobo.get(['/multiple', '/paths'], function(request, response) {
  response.sendHtml('huha');
});

nobo.get('/underscore', function(request, response) {
  response.sendHtml(sys.inspect(request.params));
})

nobo.fire();