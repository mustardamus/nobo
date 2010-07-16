var fs        = require('fs');

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
  }
}

for(var c in response) { exports[c] = response[c]; }