# assemble-bootstrap

> Build [Bootstrap](https://github.com/twbs/bootstrap) with [Assemble][assemble] instead of Jekyll.

#### [See it live →](http://assemble.github.io/assemble-bootstrap/)

* Converts the liquid templates to Handlebars
* Builds the HTML from templates using [Assemble][assemble].

## Quickstart
_You must have NPM, Bower and Grunt installed globally before you begin._

From the command line:
1. **[Downlaod][download]** this project or run `bower install assemble-bootstrap`, then `cd` into the project
2. **Install Bootstrap and dependencies**: Run `npm i && bower install && cd vendor/bootstrap && npm i`
3. **Build**: With the depencies successfully installed, you may now run `grunt` to build the project.

_Note that if you want to get the absolute latest, bleeding edge Bootstrap you will need to do `git clone https://github.com/twbs/bootstrap.git "vendor/bootstrap"`, since `bower install` only installs the **latest tagged version** (when a repo uses tags)._


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

## Author

**Jon Schlinkert**

+ [http://github.com/jonschlinkert](http://github.com/jonschlinkert)
+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Use [Assemble][assemble] to build and maintain your gh-pages, blog or documentation. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
* 2013-08-03    v0.2.0    Refactored to be awesome.
* 2013-07-16    v0.1.0    First commit.


[download]: https://github.com/assemble/assemble-bootstrap/archive/master.zip "Download assemble-bootstrap"
[helpers]: https://github.com/assemble/handlebars-helpers "Handlebars Helpers"
[assemble]: https://github.com/assemble/assemble/ "Assemble"
[assemble-boilerplates]: https://github.com/assemble/assemble-boilerplates "Assemble Boilerplates"

[gruntfile]: http://gruntjs.com/sample-gruntfile
[configuring tasks]: http://gruntjs.com/configuring-tasks
[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets
[files-object]: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically