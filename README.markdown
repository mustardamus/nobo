# Nobo - Node.js Framework

## Writing an app

                require('./modules');
    var nobo  = require('nobo');
                //require('underscore');


    nobo.get('/hello', function(request, response) {
      response.sendHtml('World!');
    });

    nobo.post('/say', function(request, response) {
      response.sendJson({ word: request.params.word });
    });

    nobo.fire();

### request & response extension

Nobo extends the request and response objects returned to your callback. See the example abothe for the usage.

Available extensions:

    request.params                                - a hash with passed parameters
    response.send(statusCode, body, contentType)  - send raw data
    response.sendText(body)                       - send text
    response.sendHtml(body)                       - send html
    response.sendJson(body)                       - send a string or abjact back as JSON
    response.sendFile(path, contentType)          - send file
    response.sendInspect(body)                    - send a object through a sys.inspect()
    response.sendPackedHtml(path)                 - pack all assets (js|css|less) linked in the file and return new body
    response.sendLess(path)                       - read the .less file and return parsed css
    
## Using Less in your app

    <link rel="stylesheet" type="text/css" media="screen" href="css/app.less" />

And you are good to go.

## Packing assets

Nobo can pack all linked files (js|css|less) in a .html file together resulting in one .html file with embedded scripts and styles. For example:

    <script type="text/javascript" src="js/app.js"></script>

becomes

    <script type="text/javascript">
    $(document).ready(function() {
      //your awesome client-side javascript here
    });
    </script>
    

You can activate packing in the config.js file:

    packAssets: true


## Test it before you write your app

Assuming the initial app is running.

    node app.js

Run the test.

    $ node test/nobo.js 
    OK: GET / 200 text/html "something great" found in body
    OK: GET /index.html 200 text/html "something great" found in body
    OK: GET /css/reset.css 200 text/css "html,body" found in body
    OK: GET /css/app.less 200 text/css "background: #eeeeee;" found in body
    OK: GET /js/app.js 200 text/javascript "ready" found in body
    OK: GET /hello 200 text/html "World" found in body
    OK: GET /notexistent 404 text "404" found in body
    OK: POST /say?word=kewl 200 application/json "kewl" found in body
    OK: PUT /update 200 text "awesome" found in body