const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');

module.exports = (env) => {

  return merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
      new Dotenv({
        path: './.env.production',
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

};