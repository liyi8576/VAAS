const { PATHS, FILES, SETTINGS } = require('./constants');
const webpack = require('webpack');

module.exports = {
  entry: Object.keys(require(FILES.packageJson).dependencies),
  output: {
    path: PATHS.dllPath,
    filename: 'vendor.bundle.js',
    library: 'vendor_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: FILES.vendorManifest,
    }),
  ],
};
