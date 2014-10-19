/*!
 * assemble-bootstrap <https://github.com/jonschlinkert/assemble-bootstrap>
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var through = require('through2');
var convert = require('liquid-to-handlebars');
var gutil = require('gulp-util');

module.exports = function (options) {
  options = options || {};

  return through.obj(function (file, enc, callback) {
    try {

      file.path = gutil.replaceExtension(file.path, '.hbs');
      var str = convert(file.contents.toString('utf8'));
      file.contents = new Buffer(str);
    } catch (err) {
      return callback(new gutil.PluginError('assemble-bootstrap', err, options));
    }

    callback(null, file);
  });
};