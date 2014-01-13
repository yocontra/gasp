var gulp = require('gulp');

var loadTask = function(taskName){
  var taskConfig = graspfile[taskName];
  
  if (!Array.isArray(taskConfig.deps)) taskConfig.deps = [];
  
  gulp.task(taskName, taskConfig.deps, function(){
    var stream = gulp.src(taskConfig.src);
    // for each plugin pipe stream to it
    taskConfig.plugins.forEach(function(plugArr){
      var pluginPath = plugArr.shift();
      var plugin = require(pluginPath);
      var inst = plugin.call(plugin, plugArr);
      stream = stream.pipe(inst);
    });
    // pipe it to the output
    return stream.pipe(taskConfig.dest);
  });
  return gulp;
};

module.exports = function(gaspfile) {
  Object.keys(graspfile).forEach(loadTask);
  return gulp;
};
