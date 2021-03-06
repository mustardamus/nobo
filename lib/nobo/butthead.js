var config      = require('../../config'),
    fs          = require('fs'),
    path        = require('path'),
    htmlparser  = require('node-htmlparser'),
    less        = require('less');
                  require('underscore');
                  
var newBody = '';

var butthead = {
  generateBody: function(path, startTag, endTag, wrapper) {
    if(path.substr(0, 7) != 'http://') {
      newBody = newBody.toString();

      var content = fs.readFileSync(config.root+'/public/'+path, 'binary'),
          pos     = newBody.indexOf(path),
          before  = newBody.substr(0, pos).split(startTag),
          after   = newBody.substr(pos).split(endTag),
          search  = startTag+_.last(before) + _.first(after)+endTag;
      
      if(path.substr(path.length-5) == '.less') {
        less.render(content, function(error, css) {
          content = css;
        });
      }

      newBody = newBody.replace(search, wrapper.replace('><', ">\n"+content+"\n<"));
    }
  },
  parseTag: function(tag) {
    switch(tag.name) {
      case 'link':
        butthead.generateBody(tag.attribs.href, '<link', '/>', '<style type="text/css"></style>');
        break;
      case 'script':
        butthead.generateBody(tag.attribs.src, '<script', '</script>', '<script type="text/javascript"></script>');
        break;
    }
  },
  beavis: function(filename) {
        newBody = fs.readFileSync(filename);
    var handler = new htmlparser.DefaultHandler(),
        parser  = new htmlparser.Parser(handler);

    parser.parseComplete(newBody);

    _.each(handler.dom[2].children, function(toplevel) {
      if(toplevel.name && toplevel.name == 'head') {
        _.each(toplevel.children, function(tag) {
          butthead.parseTag(tag);
        });
      }
    });

    return newBody;
  }
}

exports.beavis = butthead.beavis;