const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
// const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');

const { PATHS, SETTINGS } = require('./constants');
const devConfig = require('./webpack.config.dev');
const openBrowser = require('react-dev-utils/openBrowser');
// react运行时异常时，可以在页面上展示一个覆盖层显示错误信息
const errorOverlayMiddleware = require('react-error-overlay/middleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
// const clearConsole = require('react-dev-utils/clearConsole');
const isInteractive = process.stdout.isTTY;
// const useYarn = fs.existsSync(FILES.yarnLockFile);
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const urls = prepareUrls(protocol, SETTINGS.HOST, SETTINGS.PORT);
const devServerConfig = {
  contentBase: PATHS.appPublic,
  publicPath: devConfig.output.publicPath,
  compress: true,
  // open: true,
  // openPage: '',
  quiet: true,
  // noInfo: true, //「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示
  disableHostCheck: true,
  clientLogLevel: 'none',
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  // 精确控制 bundle 信息展示 https://doc.webpack-china.org/configuration/stats/,使用 quiet 或 noInfo 时，此选项无效
  stats: { colors: true, errors: true, warnings: true },
  inline: true,
  //当启用 lazy 时，dev-server 只有在请求时才编译包
  lazy: false,
  hot: true, //启用 webpack 的模块热替换特性
  //hotOnly: true, //Enables Hot Module Replacement
  headers: { 'Access-Control-Allow-Origin': '*' }, //在所有响应中添加首部内容：
  overlay: {
    //在浏览器上展示编译错误和警告信息
    errors: true,
    warnings: true,
  },
  historyApiFallback: {
    verbose: true,
    disableDotRule: true, //当路径中使用点,需要使用 disableDotRule：
  },
  proxy: {
    '/vaas/api/**': {
      target: 'http://192.168.100.64:3389/',
      changeOrigin: true,
    },
  },
  setup(app) {
    app.use(errorOverlayMiddleware());
    app.use(noopServiceWorkerMiddleware());
  },
};

// const compiler = createCompiler(webpack, devConfig, require(FILES.packageJson).name, urls, useYarn);
new WebpackDevServer(webpack(devConfig), devServerConfig).listen(
  SETTINGS.PORT,
  SETTINGS.HOST,
  err => {
    if (err) {
      return console.log(err);
    }
    if (isInteractive) {
      // clearConsole();
    }
    console.log(chalk.cyan(`Starting the development server, ${urls.localUrlForBrowser}...\n`));
    openBrowser(urls.localUrlForBrowser);
  }
);
