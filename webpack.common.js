const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// custom parser libraries
const yaml = require('yamljs');

module.exports = {
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
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'src/secretstatic', to: 'secret' },
    //   ],
    // }),
  ],
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
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

