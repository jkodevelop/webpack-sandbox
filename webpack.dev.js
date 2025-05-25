const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    compress: true, // enable: gzip
    port: 9000,
  },
  optimization: {
    runtimeChunk: 'single',
  },
});
