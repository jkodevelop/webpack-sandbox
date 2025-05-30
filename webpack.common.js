const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// custom parser libraries
const yaml = require('yamljs');

const { commonLog } = require('./src/globalHelper.js');

module.exports = (args) => {
  return {
    mode: args.mode,
    entry: { 
      index: './src/index.js',
      print: './src/print.js'
    },
    resolve: {
      extensions: ['.js','.cjs'],
    },
    output: {
      filename: '[name].bundle.js', // '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      minimizer: [
        new CssMinimizerPlugin({ parallel:true }),
      ],
      minimize: true, // enable minification when mode:'development', without this only mode:'producton' will minify
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Get Started Webpack',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/secretstatic', to: 'secret' },
        ],
      }),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify('v1.0'),
        COMMON_FUNC: commonLog,
      }),
      new Dotenv({
        path: `./.env.${args.mode}`,
      }),
    ],
    module: {
      rules: [{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]',
        },
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]',
        },
      },{
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },{
        test: /\.xml$/i,
        use: ['xml-loader'],
      },{
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      }],
    },
  };

};