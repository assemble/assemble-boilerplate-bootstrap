'use strict';

var del = require('del');
var gulp = require('gulp');
var convert = require('./build/plugins/liquid');


gulp.task('liquid', function () {
  gulp.src('vendor/bootstrap/docs/**/*.html')
    .pipe(convert())
    .pipe(gulp.dest('tmp/templates'));
});

gulp.task('less', function () {
  gulp.src('vendor/bootstrap/less/**')
    .pipe(gulp.dest('tmp/less/'));
});

gulp.task('default', ['liquid', 'less']);
