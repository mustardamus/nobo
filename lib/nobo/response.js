                  require('../../modules');
var fs          = require('fs'),
    sys         = require('sys'),
    htmlparser  = require('node-htmlparser'),
    butthead    = require('./butthead'),
    less        = require('less');
                  require('underscore');

var response = {
  send: function(statusCode, body, contentType) {
    this.writeHead(statusCode, { 'Content-Type': contentType }, body);
    this.end(body);
  },
  sendText: function(body) {
    this.send(200, body, 'text');
  },
  sendHtml: function(body) {
    this.send(200, body, 'text/html');
  },
  sendJson: function(body) {
    this.send(200, JSON.stringify(body), 'application/json');
  },
  sendFile: function(path, contentType) {
    this.send(200, fs.readFileSync(path, 'binary'), contentType);
  },
  sendInspect: function(body) {
    this.send(200, sys.inspect(body), 'text');
  },
  sendPackedHtml: function(path) {
    this.sendHtml(butthead.beavis(path));
  },
  sendLess: function(path) {
    var resp = this;
    
    less.render(fs.readFileSync(path).toString(), function(error, css) {
      resp.send(200, css, 'text/css');
    });
  }
}

for(var c in response) { exports[c] = response[c]; }