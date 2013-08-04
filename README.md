# assemble-bootstrap

> Build Bootstrap with [Assemble][assemble] instead of Jekyll.

#### [See it live →](http://assemble.github.io/assemble-bootstrap/)

This is _not a fork or port_ of Bootstrap. This project uses Bootstrap's Gruntfile for compiling CSS and JavaScript, running tests, and all of the other tasks  to buid with a couple enhancements:

* Pulls down the latest Bootstrap,
* Converts the liquid templates to Handlebars
* Builds the HTML from templates using [Assemble][assemble]. The rest of the project, CSS, JavaScript etc. is mostly unchanged from Bootstrap's Gruntfile configuration.

_You must have NPM, Bower and Grunt install globally before you begin._

## 60 Second Quickstart

After you download this project, `cd` into the project dir, then copy/paste and run the following command to install [Bootstrap](https://github.com/twbs/bootstrap), [Grunt.js](http://gruntjs.com/), [Assemble][assemble] and all of the necessary dependencies:

```bash
npm install && bower install && cd vendor/bootstrap && npm install
```

Now run `grunt` to build the project.


More about [the built-in Grunt commands](https://github.com/assemble/assemble-bootstrap/issues/7).


## The "assemble" task
If you haven't used [Assemble][assemble] before, it might be worthwhile to visit [http://assemble.io/docs](http://assemble.io/docs) if you need help building the project or learning how to customize it.

### Overview
In the project's Gruntfile, the example `assemble` task is pre-loaded with paths and options to build the project successfully:

```js
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
}
```

## Under the Hood

The only thing this project does is convert liquid templates

## Authors

**Jon Schlinkert**

+ [http://github.com/jonschlinkert](http://github.com/jonschlinkert)
+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [http://github.com/doowb](http://github.com/doowb)
+ [http://twitter.com/doowb](http://twitter.com/doowb)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Use [Assemble][assemble] to build and maintain your gh-pages, blog or documentation. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
* 2013-08-03    v0.2.0    Refactored to be awesome.
* 2013-07-16    v0.1.0    First commit.


[download]: https://github.com/assemble/assemble-bootstrap/archive/3.0.0-wip.zip "Download Assemble"
[helpers]: https://github.com/assemble/handlebars-helpers "Handlebars Helpers"
[assemble]: https://github.com/assemble/assemble/ "Assemble"
[assemble-boilerplates]: https://github.com/assemble/assemble-boilerplates "Assemble Boilerplates"

[gruntfile]: http://gruntjs.com/sample-gruntfile
[configuring tasks]: http://gruntjs.com/configuring-tasks
[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets
[files-object]: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically