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

gasp is a very thin declarative layer on top of gulp. gasp works with gulp plugins. gasp should only be used for very simple build processes

## Usage

A sample gaspfile.coffee - gaspfiles can be js, json, whatever. it just needs to be an object when required.

```coffee-script
less = require "gulp-less"
watch = require "gulp-watch"
jshint = require "gulp-jshint"
stylish = require "jshint-stylish"

module.exports =
  css:
    src: "./static/src/*.less"
    pipeline: [
      watch,
      less,
      # a string in your pipeline
      # is an output folder
      "./static/dist/css"
    ]

  js:
    src: "./js/*.js"
    pipeline: [
      watch,
      jshint,
      # when you need to pass in arguments
      # just bind them to the plugin function
      # there could be sugar for this soon
      jshint.reporter.bind(null, stylish)
    ]

  default:
    # you can specify other tasks as dependencies
    # to create aggregate tasks
    # or just run the other tasks before yours starts
    deps: ["js", "css"]
```

If you need to do something more complex you can require gulp into the file and define some tasks, or replace your task object with a normal gulp task function.

## CLI

CLI takes the same options as gulp

## LICENSE

(MIT License)

Copyright (c) 2014 Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
