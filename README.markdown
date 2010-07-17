# Nobo - Node.js Framework

## Writing an app

                      require('./modules');
    var nobo        = require('nobo');
    
    nobo.get('/hello', function(request, response) {
      response.sendHtml('World!');
    });

    nobo.fire();

### request & response extension

Nobo extends the request and response objects returned to your callback.

    nobo.get('/params', function(request, response) {
      response.sendHtml(request.params);
    });

Available extensions:

    request.params                                - a hash with passed parameters
    response.send(statusCode, body, contentType)  - send raw data
    response.sendHtml(body)                       - send html
    response.sendFile(path, contentType)          - send file
    response.sendInspect(body)                    - send a object through a sys.inspect()
    response.sendPackedHtml(path)                 - pack all assets (js|css|less) linked in the file and return new body
    response.sendLess(path)                       - read the .less file and return parsed css
    
## 