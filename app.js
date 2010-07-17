            require('./modules');
var nobo  = require('nobo'),
    sys   = require('sys');

//require('underscore');


nobo.get('/hello', function(request, response) {
  response.sendHtml('World!');
});

nobo.fire();