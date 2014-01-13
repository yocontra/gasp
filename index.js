var gulp = require('gulp');

var loadPlugin = function(plug) {
  if (typeof plug === 'string') {
    return gulp.dest.bind(null, plug);
  }
  if (typeof plug === 'function') {
    return plug;
  }
  throw new Error('Invalid plugin: ' + plug);
};

var loadTask = function(taskName){
  var taskConfig = graspfile[taskName];
  
  if (typeof taskConfig === 'function') {
    fn = taskConfig;
  } else {
    if (!Array.isArray(taskConfig.deps)) taskConfig.deps = [];
    fn = function(){
      var stream = gulp.src(taskConfig.src);

      // for each plugin pipe stream to it
      if (Array.isArray(taskConfig.pipeline)) {
        taskConfig.pipeline.forEach(function(plugin){
          stream = stream.pipe(loadPlugin(plugin));
        });
      }
      return stream;
    };
  }
  gulp.task(taskName, taskConfig.deps, fn);
  return gulp;
};

module.exports = function(gaspfile) {
  Object.keys(graspfile).forEach(loadTask);
  return gulp;
};

module.exports.gulp = gulp;