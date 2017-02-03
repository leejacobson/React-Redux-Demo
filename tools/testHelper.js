// Prevent mocha from interpreting CSS @import files
function noop() {
  return null;
}

require.extensions['.css', '.less'] = noop;

var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};