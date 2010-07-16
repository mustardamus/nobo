= Nobo - Node.js Framework

== Writing an app

                      require('./modules');
    var nobo        = require('nobo');
    
    nobo.get('/hello', function(request, response) {
      response.sendHtml('World!');
    });

    nobo.fire();

=== request & response extension

Nobo extends the request and response objects returned to your callback.

    nobo.get('/params', function(request, response) {
      response.sendHtml(request.params);
    });


== Problems
When multiple files are requested (from index.html) it sometimes serve the wrong file (async) - idea: dont serve as files, but dynamically insert into index.html