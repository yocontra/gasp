#!/usr/bin/env node

var path = require('path');

var argv = require('optimist').argv;
var completion = require('../lib/completion');
var semver = require('semver');

if (argv.completion) {
  return completion(argv.completion);
}

var resolve = require('resolve');
var findup = require('findup-sync');
var gutil = require('gulp-util');
var prettyTime = require('pretty-hrtime');

var tasks = argv._;
var cliPkg = require('../package.json');

var localBaseDir = process.cwd();

loadRequires(argv.require, localBaseDir);

var gaspFile = getGaspFile(localBaseDir);

// find the local gasp
var localGasp = findLocalGasp(gaspFile);
var localPkg = findLocalGaspPackage(gaspFile);

// print some versions and shit
if (argv.v || argv.version) {
  gutil.log('CLI version', cliPkg.version);
  if (localGasp) {
    gutil.log('Local version', localPkg.version);
  }
  process.exit(0);
}

if (!localGasp) {
  gutil.log(gutil.colors.red('No local gasp install found in'), getLocalBase(gaspFile));
  gutil.log(gutil.colors.red('Perhaps do: npm install gasp'));
  process.exit(1);
}

// check for semver difference in CLI vs local and warn if CLI > local
if (semver.gt(cliPkg.version, localPkg.version)) {
  gutil.log(gutil.colors.red('CLI Gasp version is higher than the local one'));
  gutil.log('CLI version', cliPkg.version);
  gutil.log('Local version', localPkg.version);

  process.exit(1);
}

if (!gaspFile) {
  gutil.log(gutil.colors.red('No Gaspfile found'));
  process.exit(1);
}

// Wire up logging for tasks
// on local gasp singleton
logEvents(localGasp.gulp);

// Load their gaspfile and run it
gutil.log('Using file', gutil.colors.magenta(gaspFile));
loadGaspFile(localGasp, gaspFile, tasks);

function loadRequires(requires, baseDir) {
  if (typeof requires === 'undefined') requires = [];
  if (!Array.isArray(requires)) requires = [requires];
  return requires.map(function(modName){
    gutil.log('Requiring external module', gutil.colors.magenta(modName));
    var mod = findLocalModule(modName, baseDir);
    if (typeof mod === 'undefined') {
      gutil.log('Failed to load external module', gutil.colors.magenta(modName));
    }
  });
}

function getLocalBase(gaspFile) {
  return path.resolve(path.dirname(gaspFile));
}

function findLocalGasp(gaspFile){
  var baseDir = getLocalBase(gaspFile);
  return findLocalModule('gasp', baseDir);
}

function findLocalModule(modName, baseDir){
  try {
    return require(resolve.sync(modName, {basedir: baseDir}));
  } catch(e) {}
  return;
}

function findLocalGaspPackage(gaspFile){
  var baseDir = getLocalBase(gaspFile);
  var packageBase;
  try {
    packageBase = path.dirname(resolve.sync('gasp', {basedir: baseDir}));
    return require(path.join(packageBase, 'package.json'));
  } catch(e) {}
  return;
}

function loadGaspFile(localGasp, gaspFile, tasks){
  var gaspFileCwd = path.dirname(gaspFile);
  process.chdir(gaspFileCwd);
  gutil.log('Working directory changed to', gutil.colors.magenta(gaspFileCwd));

  var theGaspfile = require(gaspFile);

  // just for good measure
  process.nextTick(function(){
    localGasp(theGaspfile); // loads all the tasks
    localGasp.gulp.run.apply(localGasp.gulp, tasks);
  });
  return theGaspfile;
}

function getGaspFile(baseDir) {
  var extensions;
  if (require.extensions) {
    extensions = Object.keys(require.extensions).join(',');
  } else {
    extensions = ['.js','.json'];
  }
  var gaspFile = findup('Gaspfile{'+extensions+'}', {nocase: true});
  return gaspFile;
}

// format orchestrator errors
function formatError (e) {
  if (!e.err) return e.message;
  if (e.err.message) return e.err.message;
  return JSON.stringify(e.err);
}

// wire up logging events
function logEvents(gasp) {
  gasp.on('task_start', function(e){
    gutil.log('Running', "'"+gutil.colors.cyan(e.task)+"'...");
  });

  gasp.on('task_stop', function(e){
    var time = prettyTime(e.hrDuration);
    gutil.log('Finished', "'"+gutil.colors.cyan(e.task)+"'", 'in', gutil.colors.magenta(time));
  });

  gasp.on('task_err', function(e){
    var msg = formatError(e);
    var time = prettyTime(e.hrDuration);
    gutil.log('Errored', "'"+gutil.colors.cyan(e.task)+"'", 'in', gutil.colors.magenta(time), gutil.colors.red(msg));
  });

  gasp.on('task_not_found', function(err){
    gutil.log(gutil.colors.red("Task '"+err.task+"' was not defined in your gaspfile but you tried to run it."));
    gutil.log('Please check the documentation for proper gaspfile formatting.');
    process.exit(1);
  });
}