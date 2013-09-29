/*
 * assemble-bootstrap
 * http://github.com/assemble/assemble-bootstrap
 *
 * Copyright (c) 2013 Jon Schlinkert
 * MIT License
 */

module.exports = function(grunt) {

  "use strict";

  grunt.util._.mixin(require('resolve-dep'));

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
    replacements: require('./tasks/replacements'),

    // Refactor Liquid to Handlebars so we can
    // build with Assemble instead of Jekyll
    refactor: {
      bootstrap: {
        options: {
          replacements: '<%= replacements.regex.patterns %>'
        },
        files: [{
            expand: true,
            cwd: 'vendor/bootstrap',
            src: ['*.html', '_layouts/*.html', '_includes/*.html', '!js/**'],
            dest: 'src/',
            ext: '.hbs'
          }
        ]
      },
      examples: {
        options: {
          replacements: [
            {
              // Fix example assets
              pattern: /(..\/..\/dist\/)/gi,
              replacement: '../../assets/'
            }
          ]
        },
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: 'vendor/bootstrap/examples/',
          src: ['{*,**}/*.html'],
          dest: '<%= site.destination %>/examples/'
        }]
      }
    },

    assemble: {
      options: {
        pkg: '<%= pkg %>',
        site: '<%= site %>',
        flatten: true,
        // Load prettify helper from node_modules.
        helpers: ['<%= _.loadDev("helper-*") %>'],
        prettify: {
          condense: true,
          indent_scripts: 'keep'
        },
        assets: '<%= site.destination %>/assets',
        partials: 'src/_includes/*.hbs',
        layoutdir: 'src/_layouts',
        layout: 'default.hbs'
      },
      docs: {
        src: ['src/*.hbs'],
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
          {expand: true, cwd: 'vendor/bootstrap/examples', src: ['**/*.css', '**/*.{jpg,png,gif}'], dest: '<%= site.destination %>/examples/'},
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
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-refactor');

  // Load local "Subgrunt" task to run Bootstrap's Gruntfile.
  grunt.loadTasks('tasks');

  grunt.registerTask('wraplayouts', function() {
    var layouts = grunt.file.expand('src/_layouts/*.hbs').map(function(layout) {
      grunt.file.write(layout, "{{#prettify}}" + grunt.file.read(layout) + "{{/prettify}}");
    });
  });

  // Tests task.
  grunt.registerTask('test', ['subgrunt:test']);

  // Default task to be run with the "grunt" command.
  grunt.registerTask('default', [
    'clean',
    'subgrunt:js',
    'subgrunt:css',
    'copy',
    'refactor',
    'wraplayouts',
    'assemble'
  ]);
};
