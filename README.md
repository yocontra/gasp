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

WARNING - Work in progress. This doesn't actually exist yet - this is just for collecting ideas.

## Information

gasp is a very thin declarative layer on top of gulp. gasp works with gulp plugins. gasp should only be used for very simple build processes. use gulp if you need something faster/more complex

## Usage

A sample gaspfile.json - gaspfiles are declarative so they are pure json (you can use a .js file if you need to, just export the object)

```javascript
// plugins used: gulp-concat, gulp-uglify, gulp-watch, gulp-rimraf
// gasp will load plugins gulp-* plugins on demand
{
  // this task is only here to demonstrate the dependency system
  clean: {
    src: 'public/**/*',
    plugins: ['rimraf'] // just use a string if you have no arguments
  },

  scripts: {
    deps: ['clean'], // dependencies

    src: ['client/js/**/*.js', '!client/js/vendor/**'], // source files
    dest: 'public/js', // output folder

    // plugins in the order you want them to run
    // when you want to pass arguments to a task
    // just use an array where the first item is the plugin name
    // and all other items are the arguments
    plugins: [
      'watch',
      ['concat', 'all.js'],
      'uglify'
    ]
  },

  images: {
    deps: ['clean'],

    src: 'client/img/**',
    dest: 'public/img',

    plugins: [
      'watch',
      ['imagemin', {optimizationLevel: 5}]
    ]
  }
}
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
