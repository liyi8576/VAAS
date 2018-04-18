const { SETTINGS, PATHS, FILES } = require('./constants');

const webpack = require('webpack');
// 自动生成html 文件，并且引用相关的assets文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 可以用在html模板文件里使用变量%NODE_ENV%
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// 从bundle中提取出特定的text到一个文件中
// 使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 分析webpack bundle 图形化展示
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 显示友好的错误提示
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// 开发&生产通用插件
exports.commonPlugins = [
  new InterpolateHtmlPlugin({
    PUBLIC_URL: '/',
  }),
  //定义环境变量,将 Node 中使用的变量也传入到 Web 环境中，以方便使用
  new webpack.DefinePlugin({
    'process.env': {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    SETTINGS: JSON.stringify(SETTINGS),
    //判断当前是否处于开发状态
    __IS_DEV__: process.env.NODE_ENV === 'development',
    __IS_MOCK__: true,
  }),
];

//开发时使用插件
exports.devPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  new HtmlWebpackPlugin({
    inject: true, //js引入放在body底部
    title: SETTINGS.appTitle,
    filename: 'index.html',
    favicon: FILES.favicon,
    template: FILES.appIndexTpl,
  }),
  // 启用 HMR
  new webpack.HotModuleReplacementPlugin(),
  // 在控制台中输出可读的模块名
  new webpack.NamedModulesPlugin(),
  new CaseSensitivePathsPlugin(),
  new WatchMissingNodeModulesPlugin(PATHS.appNodeModules),
  // https://juejin.im/entry/58f0348ca0bb9f006a881e5f
  // new webpack.HashedModuleIdsPlugin(),
  // 避免发出包含错误的模块
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
    options: {
      context: '/',
    },
  }),
  new webpack.DllReferencePlugin({
    manifest: require(FILES.vendorManifest),
    sourceType: 'var',
  }),
  new FriendlyErrorsWebpackPlugin(),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];

//生产环境下使用插件
exports.prodPlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  new HtmlWebpackPlugin({
    inject: true, //js引入放在body底部
    title: SETTINGS.appTitle,
    filename: 'index.html',
    template: FILES.appIndexProdTpl,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
  // 将全部 node_modules 中的代码移入
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'js/vendor.bundle.js',
    minChunks: ({ resource }) => {
      return (
        resource && resource.indexOf('node_modules') >= 0 && resource.match(/\.(js|less|scss)$/)
      );
    },
  }),
  //提取Loader定义到同一地方
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      context: '/',
    },
  }),
  //提取出所有的CSS代码
  new ExtractTextPlugin('css/[name].[contenthash:8].css'),
  new ManifestPlugin({
    fileName: 'asset-manifest.json',
  }),
  //代码压缩插件
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
      comparisons: false,
    },
    output: {
      comments: false,
      ascii_only: true,
    },
    sourceMap: true,
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
  }),
  //Merge chunks
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];
