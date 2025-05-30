const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// custom parser libraries
const yaml = require('yamljs');

const { commonLog } = require('./src/globalHelper.js');

module.exports = (env) => {

  return {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.jsx',
    resolve: {
      extensions: ['*','.js','.cjs','.jsx'],
    },
    output: {
      filename: '[name].[contenthash].js', // '[name].[contenthash].js',
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
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash].css', // '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css', // '[id].[contenthash].css',
      }),
      // new CopyPlugin({
      //   patterns: [
      //     { from: 'src/secretstatic', to: 'secret' },
      //   ],
      // }),
      new Dotenv({
        path: './.env.production',
      }),
      new webpack.DefinePlugin({
        // 'node_cli_env': JSON.stringify(env),
        VERSION: JSON.stringify('v1.0'),
        COMMON_FUNC: commonLog,
      }),
    ],
    module: {
      rules: [
      {
        test: /\.(cjs|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          // webpack's rules order
          // step 3: extract the css into an external stylesheet .css file
          MiniCssExtractPlugin.loader,
          // step 2: Tranlates CSS into CommonJS
          'css-loader',
          // step 1: Compiles Sass to CSS
          'sass-loader'],
      },{
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
