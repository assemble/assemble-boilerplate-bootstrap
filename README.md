# boilerplate-bootstrap

> Build [Bootstrap](https://github.com/twbs/bootstrap) with [Assemble][assemble] instead of Jekyll.

#### [See it live →](http://assemble.github.io/boilerplate-bootstrap/)

* Converts the liquid templates to Handlebars
* Builds the HTML from templates using [Assemble][assemble].

## Quickstart
_You must have [NPM](npmjs.org), [Bower][bower] and [Grunt][grunt] installed globally before you begin._

### First

* Either **[download][download]** this project,
* Or `git clone https://github.com/assemble/boilerplate-bootstrap.git`
* Or run `bower install boilerplate-bootstrap`

### Next

`cd` into the project, and from the command line run:

```bash
npm i && bower install && cd vendor/bootstrap && npm i
```
You may now run `grunt` to build the project.

_Note that if you want to get the absolute latest, bleeding edge Bootstrap you will need to use `git clone https://github.com/twbs/bootstrap.git 'vendor/bootstrap'` instead of `bower install`._


## The "assemble" task
If you haven't used [Assemble][assemble] before, please visit [http://assemble.io/docs](http://assemble.io/docs) to learn how to customize the task.

### Overview
In the project's Gruntfile, the example `assemble` task is pre-loaded with paths and options to build the project successfully:

```js
assemble: {
  options: {
    site: '<%= site %>',
    flatten: true,
    assets: 'tmp/assets',
    partials: 'tmp/_includes/*.hbs',
    layoutdir: 'tmp/_layouts',
    layout: 'default.hbs'
  },
  docs: {
    src: ['tmp/*.hbs'],
    dest: 'tmp/'
  }
}
```

<!--

## Options #2

```bash
npm i assemble boilerplate-bootstrap --save-dev
```

Once this plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```bash
grunt.loadNpmTasks('grunt-contrib-less');
```

## The "refactor" task

This task converts Bootstrap's liquid templates to Handlebars templates. To use the task add the following configuration to the Gruntfile:

```js
// Regex for refactor task.
replacements: require('./node_modules/boilerplate-bootstrap/tasks/replacements').init(grunt),

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
}
```


## The "assemble" task
If you haven't used [Assemble][assemble] before, please visit [http://assemble.io/docs](http://assemble.io/docs) to learn how to customize the task.

### Overview
In the project's Gruntfile, the example `assemble` task is pre-loaded with paths and options to build the project successfully:

```js
assemble: {
  options: {
    site: '<%= site %>',
    flatten: true,
    assets: 'tmp/assets',
    partials: 'tmp/_includes/*.hbs',
    layoutdir: 'tmp/_layouts',
    layout: 'default.hbs'
  },
  docs: {
    src: ['tmp/*.hbs'],
    dest: 'tmp/'
  }
}
```
 -->


## Author

**Jon Schlinkert**

+ [http://github.com/jonschlinkert](http://github.com/jonschlinkert)
+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Use [Assemble][assemble] to build and maintain your gh-pages, blog or documentation. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
* 2013-08-03    v0.2.0    Refactored to be awesome.
* 2013-07-16    v0.1.0    First commit.


[download]: https://github.com/assemble/boilerplate-bootstrap/archive/master.zip "Download boilerplate-bootstrap"
[helpers]: https://github.com/assemble/handlebars-helpers "Handlebars Helpers"
[assemble]: https://github.com/assemble/assemble/ "Assemble"
[assemble-boilerplates]: https://github.com/assemble/assemble-boilerplates "Assemble Boilerplates"

[bower]: https://github.com/bower/bower
[grunt]: http://gruntjs.com
[gruntfile]: http://gruntjs.com/sample-gruntfile
[configuring tasks]: http://gruntjs.com/configuring-tasks
[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets
[files-object]: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically