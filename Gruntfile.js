/* jshint node: true */
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg   : grunt.file.readJSON('vendor/bootstrap/package.json'),
    site  : grunt.file.readYAML('vendor/bootstrap/_config.yml'),
    banner: '/**\n' +
              '* <%= pkg.name %>.js v<%= pkg.version %> by @fat and @mdo\n' +
              '* Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              '* <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              '*/\n',
    jqueryCheck: 'if (!jQuery) { throw new Error(\"Bootstrap requires jQuery\") }\n\n',
    // Task configuration.
    clean: {
      dist: ['tmp/**', 'dist/**']
    },
    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'vendor/bootstrap/js/transition.js',
          'vendor/bootstrap/js/alert.js',
          'vendor/bootstrap/js/button.js',
          'vendor/bootstrap/js/carousel.js',
          'vendor/bootstrap/js/collapse.js',
          'vendor/bootstrap/js/dropdown.js',
          'vendor/bootstrap/js/modal.js',
          'vendor/bootstrap/js/tooltip.js',
          'vendor/bootstrap/js/popover.js',
          'vendor/bootstrap/js/scrollspy.js',
          'vendor/bootstrap/js/tab.js',
          'vendor/bootstrap/js/affix.js'
        ],
        dest: 'assets/js/<%= pkg.name %>.js'
      }
    },
    jshint: {
      assemble: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['Gruntfile.js']
      },
      bootstrap: {
        options: {
          jshintrc: 'vendor/bootstrap/js/.jshintrc'
        },
        src: [
          'vendor/bootstrap/js/tests/unit/*.js',
          'vendor/bootstrap/Gruntfile.js',
          'vendor/bootstrap/js/*.js'
        ]
      }
    },
    recess: {
      options: {
        compile: true
      },
      bootstrap: {
        files: {
          'assets/css/bootstrap.css': ['vendor/bootstrap/less/bootstrap.less']
        }
      },
      min: {
        options: {
          compress: true
        },
        files: {
          'assets/css/bootstrap.min.css': ['vendor/bootstrap/less/bootstrap.less']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      bootstrap: {
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['<%= concat.bootstrap.dest %>']
        }
      }
    },
    qunit: {
      options: {
        inject: 'vendor/bootstrap/js/tests/unit/phantom.js'
      },
      files: ['vendor/bootstrap/js/tests/*.html']
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },
    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      recess: {
        files: 'less/*.less',
        tasks: ['recess']
      }
    },


    // Initialize regex for refactor task.
    replacements: require('./replacements').init(grunt),

    // Refactor Liquid to Handlebars so we can
    // build with Assemble instead of Jekyll
    replace: {
      liquid: {
        options: {
          replacements: '<%= replacements.regex.patterns %>'
        },
        files: [
          {expand: true, cwd: 'vendor/bootstrap', src: ['**/*.html', '!js/**'], dest: 'src/', ext: '.hbs'}
        ]
      }
    },

    assemble: {
      options: {
        site: '<%= site %>', // Load data from Bootstrap's _config.yml
        flatten: true,
        assets: 'assets',
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
          'assets/js/highlight.js': ['vendor/highlightjs/highlight.pack.js'],
          'assets/css/github.css':  ['vendor/highlightjs/styles/github.css']
        }
      },
      assets: {
        files: [
          {expand: true, cwd: 'vendor/bootstrap', src: ['assets/**'], dest: './'}
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');

  // Tasks for assemble-bootstrap
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-refactor');
  grunt.loadNpmTasks('assemble');


  // Test task.
  grunt.registerTask('test', ['jshint', 'qunit']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // HTML distribution task.
  grunt.registerTask('dist-html', ['replace', 'assemble']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-html', 'dist-css', 'dist-js', 'copy']);

  // Default task.
  grunt.registerTask('default', ['test', 'dist']);
};
