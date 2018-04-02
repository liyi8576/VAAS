const PATHS = require('./constants');
// 从bundle中提取出特定的text到一个文件中
// 使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 解析CSS文件并且添加浏览器前缀到CSS规则里
const autoPrefixer = require('autoprefixer');

// url-loader 将指定limit大小的图片资源作为dataURL嵌入，以避免请求
exports.assets = {
  test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'assets/[name].[hash:8].[ext]',
  },
};

//对于JS与JSX的格式校验
exports.jslint = {
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /(node_modules)/,
  loader: require.resolve('eslint-loader'),
};

// babel-loaders 用babel处理编译JS、JSX文件
exports.jsx = {
  test: /\.(js|jsx)$/,
  include: PATHS.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    babelrc: false,
    presets: [require.resolve('babel-preset-react-app')],
    compact: true,
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]],
    cacheDirectory: true,
  },
};

// json loaders
exports.json = {
  test: /\.json$/,
  loader: `${require.resolve('json-loader')}`,
};

const moduleCSSLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
};

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoPrefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
    ],
  },
};

const lessLoader = {
  loader: require.resolve('less-loader'),
};

const sassLoader = {
  loader: require.resolve('sass-loader'),
  options: {
    sourceMap: true,
  },
};

// css样式loader配置
exports.dev_styles = {
  css: {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', postCSSLoader],
  },
  scss: {
    test: /\.(scss|sass)$/,

    use: ['style-loader', moduleCSSLoader, postCSSLoader, sassLoader],
  },
  less: {
    test: /\.(less)$/,
    use: ['style-loader', 'css-loader', postCSSLoader, lessLoader],
  },
};

exports.prod_styles = {
  css: {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: ['style-loader', 'css-loader'],
    }),
  },
  scss: {
    test: /\.(scss|sass)$/,
    use: ExtractTextPlugin.extract({
      use: ['style-loader', moduleCSSLoader, postCSSLoader, 'sass-loader'],
    }),
  },
  less: {
    test: /\.(less)$/,
    use: ExtractTextPlugin.extract({
      use: ['style-loader', 'css-loader', 'less-loader'],
    }),
  },
};
