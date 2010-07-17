            require('./modules');
var nobo  = require('nobo'),
    sys   = require('sys');


nobo.get('/hello', function(request, response) {
  response.sendHtml('World!');
});

nobo.fire();