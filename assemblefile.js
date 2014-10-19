'use strict';

var del = require('del');
var gulp = require('gulp');
// var less = require('gulp-less');
var assemble = require('assemble');
var prettify = require('gulp-prettify');
var matter = require('gray-matter');
var resolve = require('resolve-dep');
// var Handlebars = require('handlebars');
// var handlebars = require('assemble/lib/plugins/handlebars')(assemble, Handlebars);
var engine = require('assemble/lib/engine/handlebars');
var convert = require('./build/plugins/liquid');
assemble.engine('hbs', engine, {destExt: '.html'});

assemble.disable('buffer plugin');
assemble.disable('parser plugin');
assemble.disable('drafts plugin');
assemble.disable('paginate plugin');
assemble.disable('collections plugin');
assemble.disable('src-routes plugin');
assemble.disable('dest-routes plugin');


assemble.option({
  assets: 'assets',
  root: 'dist'
});


// // Data
// assemble.namespace(':basename', ['data/*.{json,yml}'], true);
// assemble.data('.assemblerc.yml', true);

// assemble.task('hbs', ['less'], function () {
//   assemble.src('templates/slides.hbs')
//     .pipe(assemble.dest('_gh_pages'))
//     .pipe(prettify({indent_size: 2}))
//     .pipe(assemble.dest('_gh_pages'));
// });

// assemble.task('less', function () {
//   assemble.src('styles/index.less')
//     .pipe(less({
//       globalVars: {theme: 'slides'},
//       paths: ['styles'],
//       helpers: {
//         diameter: function (less, area) {
//           var result = (area.value * 120);
//           return (Math.ceil(Math.sqrt(result / Math.PI)) * 2) + 'px';
//         }
//       }
//     }))
//     .pipe(assemble.dest('assets/css', {
//       ext: '.css'
//     }));
// });

// assemble.task('clean', function (cb) {
//   del(['_gh_pages/assets'], cb);
// });

// assemble.task('gulp', function () {
//   gulp.src('assets/**')
//     .pipe(gulp.dest('_gh_pages/assets'));
// });


var src = 'vendor/bootstrap';
var dest = 'tmp/templates';

assemble.layouts(dest + '/_layouts/*.hbs');
assemble.partials(dest + '/_includes/**/*.hbs')
assemble.namespace(':basename', ['tmp/_data/*.yml']);
assemble.data('tmp/_config.yml');
assemble.data('tmp/_data/*.yml');

// assemble.task('liquid', function () {
//   gulp.src(src + '/docs/**/*.html')
//     .pipe(convert())
//     .pipe(gulp.dest(dest));
// });

assemble.task('hbs', function () {
  gulp.src('tmp/*.hbs')
    .pipe(gulp.dest('tmp/_gh_pages/'));
});

// assemble.task('assets:less', function () {
//   assemble.src([src + '/less/**'])
//     .pipe(assemble.dest('tmp/less'));
// });

// assemble.task('assets:_config', function () {
//   assemble.src([src + '/_config.yml'])
//     .pipe(assemble.dest('tmp'));
// });

// assemble.task('assets:_data', function () {
//   assemble.src([src + '/docs/_data/*.yml'])
//     .pipe(assemble.dest('tmp/_data'));
// });

assemble.task('default', ['hbs']);
// assemble.task('default', ['assets:less', 'assets:_config', 'assets:_data', 'hbs']);