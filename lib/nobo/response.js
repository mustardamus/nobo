                  require('../../modules');
var fs          = require('fs'),
    sys         = require('sys'),
    htmlparser  = require('node-htmlparser'),
    butthead    = require('./butthead');
                  require('underscore');

var response = {
  send: function(statusCode, body, contentType) {
    this.writeHead(statusCode, { 'Content-Type': contentType }, body);
    this.end(body);
  },
  sendHtml: function(body) {
    this.send(200, body, 'text/html');
  },
  sendFile: function(path, contentType) {
    this.send(200, fs.readFileSync(path, 'binary'), contentType);
  },
  sendInspect: function(body) {
    this.send(200, sys.inspect(body), 'text');
  },
  sendPackedHtml: function(path) {
    this.sendHtml(butthead.beavis(path));
  }
}

for(var c in response) { exports[c] = response[c]; }