const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    alias: {
      lib: Path.resolve(__dirname, './../src/lib'),
      utils: Path.resolve(__dirname, './../src/lib/utils'),
      stories: Path.resolve(__dirname, './../src/demo/stories'),
      assets: Path.resolve(__dirname, './../src/demo/assets'),
      docs: Path.resolve(__dirname, './../src/demo/docs'),
      common: Path.resolve(__dirname, './../src/demo/common'),
    },
  },
};
