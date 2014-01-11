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

WARNING - Work in progress. This doesn't actually exists yet - this is just for collecting ideas.

## Information

gasp is a very thin declarative layer on top of gulp. gasp works with gulp plugins. gasp should only be used for very simple build processes. use gulp if you need something faster/more complex

## Usage

A sample gaspfile.js

```javascript
// plugins used: gulp-concat, gulp-uglify, gulp-watch, gulp-rimraf
// gasp will load plugins gulp-* plugins on demand

var config = {
  clean: {
    src: 'build/**/*',
    plugins: {
      rimraf: null // just use null for no arguments to the plugin
    }
  },

  scripts: {
    deps: ['clean'], // dependencies

    src: ['client/js/**/*.js', '!client/js/vendor/**'], // source files
    dest: 'build/js', // output folder

    // plugins in the order you want them to run
    plugins: {
      watch: {
        name: "js" // plugin uses this option for logging
      },
      concat: 'all.js',
      uglify: {
        mangle: false
      },
    }
  },

  images: {
    deps: ['clean'],

    src: 'client/img/**',
    dest: 'public/js/',

    plugins: {
      watch: {
        name: "img"
      },
      imagemin: {
        optimizationLevel: 5
      }
    }
  }
};

module.exports = config;
```

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
