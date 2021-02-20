const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [require.resolve('../node')],
  babelrc: false,
  configFile: false
});
