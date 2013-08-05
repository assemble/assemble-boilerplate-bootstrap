/*
 * assemble-bootstrap
 * http://github.com/assemble/assemble-bootstrap
 *
 * Copyright (c) 2013 Jon Schlinkert
 * MIT License
 */

module.exports = function(grunt) {

  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Load Bootstrap's config data.
    site: grunt.file.readYAML('vendor/bootstrap/_config.yml'),
    pkg: grunt.file.readJSON('package.json'),

    // Run Bootstrap's own Gruntfile.
    subgrunt: {
      test: {
        options: {task: 'test'},
        src: ['vendor/bootstrap']
      },
      js: {
        options: {task: 'concat:bootstrap'},
        src: ['vendor/bootstrap']
      },
      css: {
        options: {task: 'recess:bootstrap'},
        src: ['vendor/bootstrap']
      },
      dist: {
        options: {task: 'dist'},
        src: ['vendor/bootstrap']
      },
      all: {
        options: {task: 'default'},
        src: ['vendor/bootstrap']
      }
    },

    // Regex for refactor task.
    replacements: require('./tasks/replacements').init(grunt),

    // Refactor Liquid to Handlebars so we can
    // build with Assemble instead of Jekyll
    refactor: {
      liquid: {
        options: {
          replacements: '<%= replacements.regex.patterns %>'
        },
        files: [{
            expand: true,
            cwd: 'vendor/bootstrap',
            src: ['*.html', '_layouts/*.html', '_includes/*.html', '!js/**'],
            dest: '<%= site.destination %>/src/',
            ext: '.hbs'
          }
        ]
      }
    },

    assemble: {
      options: {
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        flatten: true,
        assets: '<%= site.destination %>/assets',
        partials: '<%= site.destination %>/src/_includes/*.hbs',
        layoutdir: '<%= site.destination %>/src/_layouts',
        layout: 'default.hbs'
      },
      docs: {
        src: ['<%= site.destination %>/src/*.hbs'],
        dest: '<%= site.destination %>/'
      }
    },

    copy: {
      libs: {
        files: {
          '<%= site.destination %>/assets/js/highlight.js': ['vendor/highlightjs/highlight.pack.js'],
          '<%= site.destination %>/assets/css/github.css':  ['vendor/highlightjs/styles/github.css']
        }
      },
      assets: {
        files: [
          {expand: true, cwd: 'vendor/bootstrap/dist', src: ['**'], dest: '<%= site.destination %>/assets/'},
          {expand: true, cwd: 'vendor/bootstrap', src: ['assets/**'], dest: '<%= site.destination %>/'}
        ]
      }
    },

    clean: {
      dist: ['<%= site.destination %>/**/*', '!<%= site.destination %>/.{git,gitignore}']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-refactor');
  grunt.loadNpmTasks('assemble');

  // Load local "Subgrunt" task to run Bootstrap's Gruntfile.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['clean', 'subgrunt:js', 'subgrunt:css', 'copy', 'refactor', 'assemble']);
};
