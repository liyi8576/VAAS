const path = require('path');
const fs = require('fs');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson)['homepage'];
const getServedPath = appPackageJson => {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
};

const ensureSlash = (path, needsSlash) => {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
};

export const SETTINGS = {
  appTitle: '智障障碍者职业适应能力检核系统',
  HOST: ''+(JSON.stringify(process.env.HOST) || '0.0.0.0'),
  PORT: parseInt(process.env.PORT, 10) || 3000,
};
export const PATHS = {
  appPath: resolvePath('app'),
  appSrc: resolvePath('app/src'),
  appBuild: resolvePath('app/build'),
  appPublic: resolvePath('app/public'),
  dllPath: resolvePath('app/public/dll'),
  appNodeModules: resolvePath('node_modules'),
  publicUrl: getPublicUrl(resolvePath('package.json')),
  servedPath: getServedPath(resolvePath('package.json')),
};
export const FILES = {
  packageJson: resolvePath('package.json'),
  vendorManifest: resolvePath('app/public/dll/vendor_manifest.json'),
  appIndexTpl: resolvePath('app/src/index.html'),
  appHtml: resolvePath('app/public/index.html'),
  appIndexJs: resolvePath('app/src/AssessResult.jsx'),
  favicon:resolvePath('app/src/style/images/favicon.ico'),
  yarnLockFile: resolvePath('yarn.lock'),
};
