var modules = [
  { url: 'http://github.com/mikeal/node-utils' },
  { url: 'http://github.com/documentcloud/underscore/' },
  { url: 'http://github.com/tautologistics/node-htmlparser', path: 'lib' },
  { url: 'http://github.com/cloudhead/less.js', path: 'lib' }
];


require.paths.unshift(__dirname+'/lib');
require(__dirname+'/lib/nobo/loader').require(modules);