const { PATHS, FILES } = require('./constants');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-plugins');

const webpack = require('webpack');

module.exports = {
  externals: {},
  entry: [FILES.appIndexJs],
  target: 'web',
  devtool: 'source-map',
  output: {
    path: PATHS.appBuild,
    pathinfo: true,
    filename: 'js/[name].[chunkhash:8].js',
    sourceMapFilename: 'js/[name].[chunkhash:8].map',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    publicPath: PATHS.servedPath,
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
  plugins: [].concat(plugins.commonPlugins).concat(plugins.prodPlugins),
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};