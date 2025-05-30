const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = (env) => {

  // this controls the mode: and new Dotenv(path)
  const mode = 'production';
  const args = { mode };

  return merge(common(args), {
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
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