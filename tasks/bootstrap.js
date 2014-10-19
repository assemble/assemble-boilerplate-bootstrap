'use strict';

var convert = require('liquid-to-handlebars');

module.exports = function(grunt) {
  grunt.registerMultiTask('bootstrap', 'liquid to handlebars.', function() {
    var done = this.async();

    var files = this.files;
    // console.log(require('util').inspect(files, null, 10))

    files.forEach(function(fp) {
      var dest = fp.dest;
      fp.src.forEach(function (filepath) {
        var str = grunt.file.read(filepath);
        grunt.file.write(fp.dest, convert(str));
      });
    });
  });
};