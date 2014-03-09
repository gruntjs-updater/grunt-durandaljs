# grunt-durandaljs

> A [grunt](http://gruntjs.com) plugin for building [Durandal](http://durandaljs.com) projects. 

>Both scripts and views are compiled into a single output file.

>No double maintenance of path mapping. Allows various code layouts (bower, app.net etc), using the paths already configured in you main.js.

>Minimalistic and simple. No need to be expert with r.js's 60+ options.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-durandaljs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-durandaljs');
```

## The "durandaljs" task

This task compiles all the scripts and views of a Durandal project into a single js file.

The task expects that the Durandal files are under a single app dir (usually named app) and that there is a single
main module (usually at app/main.js) that contains both the requirejs path configuration and the initial module that
executes.

> While simple and minimalistic, this task can handle all known Durandal 2.x samples and starter kits (html, bower, node, asp.net, etc.) with almost no configuration.


### Overview

In your project's Gruntfile, add a section named `durandaljs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  durandaljs: {
    options: {
      baseDir: 'app',  //same as default, so not really required
      main: 'main.js', //same as default, so not really required
    },
    dev: {
      options: {
        output: 'dist/dev/main.js'
      }
    },
    prod: {
      options: {
        output: 'dist/prod/main.js',
        almond: true,
        minify: true
      }
    },
  },
});
```

### Options

#### options.verbose
Type: `Boolean`
Default value: `false`

Should the task emit information about as it progresses.

#### options.baseDir
Type: `String`
Default value: `'app'`

The path, relative to the grunt cwd, to the root directory of your Durandal app (usually called  `app` or `App` in the Durandal starter kits and generators).

This directory is expected to contain all your views, viewmodels, service modules etc. All files under it are are automatically included in the output: \*.js files as modules and text files (\*.html, \*.json) as 'text!' prefixed modules.


#### options.main
Type: `String`
Default value: `'main.js'`

The path to the main js file of the application, relative to the baseDir.

This is where we expect to find the project's `requirejs.config` call which defines all the path mapping for the external modules and libraries.

This file also contains the main module of the application.

> Note: The path and module configuration done in this file is extremely important for the build too. Promoting the 'Single Point of Truth` principle, we do not allow any configuration or path mapping outside of this file. We believe that if it is good enough for development, it it good enough for the build.

#### options.output
Type: `String`
Default value: `'output.' + path.basename(options.main)`

The path to the output js file, relative to the grunt cwd (not to the baseDir!).

#### options.minifiy
Type: `Boolean`
Default value: `false`

Determines whether the output file is minified (using Uglify2).

#### options.almond
Type: `Boolean|String`
Default value: `false`

True to wrap the generated code and include a Durandal specific version of AlmondJS, to replace the need for the much bigger requiresjs, and create a single and self sufficient output file. (Read more about [AlmondJS](https://github.com/jrburke/almond) and the [Durandal version](https://github.com/BlueSpire/almond))

If the value is a string, it should be the path to an almond script, relative to the grunt cwd. The result is similar to setting the value to `true`, expect the almond script inserted is the one specified here and not the script that comes bundled with the task.

#### options.extraModules
Type: `String[]`
Default value: `[]`

A list of extra modules to include in the output file, e.g. `['plugins/widget', 'plugins/dialog']`. This can be used for all dynamically loaded modules that reside outside of the baseDir (such as Durandal's own plugins and transitions).

We will automatically include any module whose file is under the baseDir, as well as any of their explicit dependencies. Alas, non-explicit dependencies are not recognized automatically by r.js. If their files are outside the baseDir, they will not be recognized by our scanning process. Examples are the Durandal transitions that are loaded dynamically by convention, and Durandal plugins are loaded via `app.configurePlugins({ widget: true })`.

In short, all required modules must either reside under the baseDir, be an explicit dependency of a module under that dir, or be explicitly included via the extraModules option.

Module names are resolved and mapped to files according to the paths and mapping in the `main` config file, so use the same names as you would do in your code.

#### options.require
Type: `Boolean|String|String[]`
Default value: `options.almond? true : false`

Determines if a '`require([...])'` call is to be inserted, and which modules are included in the list of required modules.

When `options.almond` is used, this value is `true` by default as almond requires usually to explicitly call `require(['<main module name>'])`, which is not the convention for require js and Durandal.

The tasks avoids inserting the call if the value is set to false. If it true, it will insert the `options.main` module. If you need to explicitly specify the module names, use the string or string array value.

#### options.moduleFilter
Type: `Function`
Default value: `function(moduleName){return true;}`

After all top level modules are resolved, they are passed via a filter function, so that you have a chance to exclude any modules for any reason you might have.

For example, if you would not like to include the views, you could supply the following function:

```js
function(moduleName){
  return moduleName.indexOf('text!') == -1;
}
```


### Usage Examples

The `tests` and `examples` folders contains several examples, for both simple and complex scenarios.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

