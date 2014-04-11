var gulp = require('gulp');
var lazypipe = require('lazypipe');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var cache = require('gulp-cached');

var loadPipeline = function(taskName, taskConfig) {
  var factory = lazypipe();

  // TODO: default partial and cache to true
  if (taskConfig.partial) {
    factory = factory.pipe(plumber);
  }

  if (taskConfig.watch) {
    factory = factory.pipe(watch);
  }

  if (taskConfig.cache) {
    factory = factory.pipe(cache, taskName);
  }

  if (taskConfig.src) {
    factory = factory.pipe(gulp.src, taskConfig.src);
  }

  if (Array.isArray(taskConfig.pipeline)) {
    taskConfig.pipeline.forEach(function(plugin){
      if (typeof plugin === 'string') {
        factory = factory.pipe(gulp.dest, plugin);
      } else {
        factory = factory.pipe(plugin);
      }
    });
  }

  if (typeof taskConfig.pipeline === 'function') {
    factory = factory.pipe(taskConfig.pipeline);
  }

  if (taskConfig.dest) {
    factory = factory.pipe(gulp.dest, taskConfig.dest);
  }
  return factory;
};

var loadTask = function(taskName, taskConfig){
  // handle task aliases
  if (Array.isArray(taskConfig)) {
    gulp.task(taskName, taskConfig);
  } else if (typeof taskConfig === 'function') {
    gulp.task(taskName, taskConfig.deps, taskConfig);
  } else {
    gulp.task(taskName, taskConfig.deps, loadPipeline(taskName, taskConfig));
  }
  return gulp;
};

module.exports = function(gaspfile) {
  Object.keys(gaspfile).forEach(function(taskName){
    loadTask(taskName, gaspfile[taskName]);
  });
  return gulp;
};

module.exports.gulp = gulp;
