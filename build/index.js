var resolve = require("resolve-dep");

resolve('build/configs/*.js').forEach(function(build) {
  require(build);
});