var config = {
  port      : 1607,                                   //which port to listen to
  debug     : true,                                   //print messages?
  packAssets: true,                                   //linked .css/.less/.js from .html will be packed in the .html file resulting in 1 request
  fileTypes : {                                       //which file types you want to register and how they need to get served
    '.html' : 'text/html',
    '.css'  : 'text/css',
    '.less' : 'text/css',
    '.js'   : 'text/javascript'
  },
  root      : __dirname
}

for(var c in config) { exports[c] = config[c]; }      //with this line you can access the configs from any file by  var config = require('config'); config.port;