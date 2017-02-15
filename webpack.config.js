const dev = require('./webpack/dev');
const prod = require('./webpack/prod');

module.exports = function buildConfig(env) {
  switch (env) {
    case 'dev':
      return dev(env);
    case 'prod':
    default:
      return prod(env);
  }
};
