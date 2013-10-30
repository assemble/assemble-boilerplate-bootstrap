# boilerplate-bootstrap [![NPM version](https://badge.fury.io/js/boilerplate-bootstrap.png)](http://badge.fury.io/js/boilerplate-bootstrap)

> Build Bootstrap with Assemble instead of Jekyll.

#### [See it live →](http://assemble.github.io/boilerplate-bootstrap/)

* Converts the liquid templates to Handlebars
* Builds the HTML from templates using [Assemble][assemble].

## Quickstart
_You must have [NPM](npmjs.org), [Bower][bower] and [Grunt][grunt] installed globally before you begin._

### First

Do _one_ of the following:

* **[download][download]** this project,
* `git clone https://github.com/assemble/boilerplate-bootstrap.git`
* `bower install boilerplate-bootstrap`

### Next

`cd` into the project, and from the command line run:

```bash
npm i && bower install && cd vendor/bootstrap && npm i
```

You may now run `grunt` to build the project.

_Note that if you want to get the absolute latest, bleeding edge Bootstrap you will need to use `git clone https://github.com/twbs/bootstrap.git 'vendor/bootstrap'` instead of `bower install`._


### The "assemble" task
If you haven't used [Assemble][assemble] before, please visit [http://assemble.io/docs](http://assemble.io/docs) to learn how to customize the task.

#### Overview
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

#### Author

**Jon Schlinkert**

+ [http://github.com/jonschlinkert](http://github.com/jonschlinkert)
+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


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