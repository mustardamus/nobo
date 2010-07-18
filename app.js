            require('./modules');
var nobo  = require('nobo');
            //require('underscore');


nobo.get('/hello', function(request, response) {
  response.sendHtml('World!');
});

nobo.get('/say', function(request, response) {
  response.sendJson('{"you wanted me to say":'+request.params.word+'}');
});

nobo.fire();