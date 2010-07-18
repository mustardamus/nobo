var nobo = require(__dirname+'/lib/nobo');
           //require('underscore');


var beforeTest = '';

nobo.before(function(request, response) {
  beforeTest = 'yep';
});

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

nobo.get('/before', function(request, response) {
  response.sendHtml(beforeTest);
})

nobo.fire();