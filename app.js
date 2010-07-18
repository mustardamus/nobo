            require('./modules');
var nobo  = require('nobo');
            //require('underscore');


nobo.get('/hello', function(request, response) {
  response.sendHtml('World!');
});

nobo.post('/say', function(request, response) {
  response.sendJson({ word: request.params.word });
});

nobo.put('/update', function(request, response) {
  response.sendText('awesome');
});

nobo.del('/delete', function(request, response) {
  response.sendText('delete');
});

nobo.fire();