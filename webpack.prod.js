const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { commonLog } = require('./src/globalHelper.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css', // '[name].[contenthash].css',
      chunkFilename: '[id].css', // '[id].[contenthash].css',
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('v01.prod'),
      'typeof window': JSON.stringify('object'),
      'process_env': JSON.stringify(process.env.NODE_ENV),
      COMMON_FUNC: commonLog,
    }),
  ],
  module: {
    rules: [{
      test: /\.(sc|sa|c)ss$/i,
      use: [
        // webpack's rules order
        // step 3: extract the css into an external stylesheet .css file
        MiniCssExtractPlugin.loader,
        // step 2: Tranlates CSS into CommonJS
        'css-loader',
        // step 1: Compiles Sass to CSS
        'sass-loader'],
    }],
  },
});
