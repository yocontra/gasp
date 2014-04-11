[![Build Status](https://travis-ci.org/wearefractal/gasp.png?branch=master)](https://travis-ci.org/wearefractal/gasp)

[![NPM version](https://badge.fury.io/js/gasp.png)](http://badge.fury.io/js/gasp)

## Information

<table>
<tr> 
<td>Package</td><td>gasp</td>
</tr>
<tr>
<td>Description</td>
<td>A declarative layer on top of gulp</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.9</td>
</tr>
</table>

WARNING - Work in progress - this is just for collecting ideas and tinkering.

## Information

gasp is a very thin declarative layer on top of gulp. gasp works with gulp plugins. gasp should only be used for very simple build processes.

## Usage

A sample gulpfile.coffee - gaspfiles can be js, json, whatever. it just needs to be an object when required.

```coffee-script
gasp = require 'gasp'
jshint = require 'gulp-jshint'
less = require 'gulp-less'
concat = require 'gulp-concat'
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'

build =
  css:
    src: ['./static/css/*.less', './static/css/bootstrap/*.less']
    dest: './static/dist/css/'

    partial: true # dont fail on errors
    watch: true # watch the files
    cache: true # only put files through the pipeline if they were modified

    # you specify an array of functions that create streams
    pipeline: [
      less
    ]

  lint:
    src: './js/*.js'

    partial: true
    watch: true
    cache: true

    pipeline: [
      jshint,
      jshint.reporter
    ]

  js:
    deps: ['lint'] # you can specify dependencies that run first

    src: './js/*.js'
    watch: true

    pipeline: [
      concat.bind(null, 'app.js'), # bind arguments into a stream constructor
      './dist/', # you can specify destinations inline by putting a string in here
      rename.bind(null, 'app.min.js'),
      uglify,
      './dist/'
    ]

  # you can give an array of tasks to create aggregate tasks
  default: ['js', 'css']

# load up the build file
gasp build
```

If you need to do something more complex you can simple use functions for your tasks like so:

```coffee-script
build: ->
  gulp.src(['./static/css/*.less', './static/css/bootstrap/*.less'])
    .pipe(less())
    .pipe(gulp.dest('./static/dist/css'))
```

## CLI

Use the gulp CLI to run this.

## LICENSE

(MIT License)

Copyright (c) 2014 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
