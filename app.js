            require('./modules');
var nobo  = require('nobo');
            //require('underscore');


nobo.get('/hello', function(request, response) {
  response.sendHtml('World!');
});

nobo.fire();