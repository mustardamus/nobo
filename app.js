            require('./modules');
var nobo  = require(__dirname + '/lib/nobo');
var mongo = require(__dirname + '/lib/nobo/mongo');
            require('underscore');
            
var sys = require('sys');


var User = mongo.model('User');


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
});

nobo.get('/mongo', function(request, response) {
  var u = new User();
      u.save();
      
  User.find().last(function(result) {
    sys.puts(sys.inspect(result.__doc.created_at));
  });
  
  response.sendInspect(u)
});

nobo.fire();