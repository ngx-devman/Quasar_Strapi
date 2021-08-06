const runningLocal = process.env.SOURCE_ENV === 'localhost' ? true : false;
const defaults = require('./defaults.json');
module.exports = {
  source(sourceCode) {
    let server = runningLocal
      ? defaults.environments['local']
      : defaults.environments[strapi.config.environment];
    let version = this.sourceVersion(sourceCode);
    // If what they picked exists, override the default...
    if (defaults.environments[sourceCode.environment])
      server = defaults.environments[sourceCode.environment];
    if (sourceCode.environment === 'custom') server = sourceCode.server;
    return `${server}/${version}`;
  },
  sourceApi(sourceCodeApi) {
    let api = runningLocal
      ? defaults.sourceCodeApi['local']
      : defaults.sourceCodeApi[strapi.config.environment];

    if (defaults.sourceCodeApi[sourceCodeApi.environment])
      api = defaults.sourceCodeApi[sourceCodeApi.environment];
    if (sourceCodeApi.environment === 'custom') api = sourceCodeApi.server;
    return `${api}`;
  },
  sourceVersion(sourceCode) {
    return sourceCode.version ? sourceCode.version : defaults.version;
  },
};
