const {PATHS, SETTINGS, FILES} = require('./constants');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-plugins');
const path =require('path');
module.exports = {
  externals: {},
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    FILES.appIndexJs,
  ],
  target: 'web',
  devtool: 'cheap-module-source-map',
  output: {
    path: PATHS.appPublic,
    pathinfo: true,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  module: {
    rules: [
      loaders.jsx,
      loaders.dev_styles.css,
      loaders.dev_styles.less,
      loaders.dev_styles.scss,
      loaders.assets,
      loaders.json,
    ],
  },
  plugins: [].concat(plugins.commonPlugins).concat(plugins.devPlugins),
  performance: {
    hints: false,
  },
};
