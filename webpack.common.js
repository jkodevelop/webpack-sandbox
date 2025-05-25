const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// custom parser libraries
const yaml = require('yamljs');

module.exports = {
  entry: { 
    index: './src/index.js',
    print: './src/print.js'
  },
  resolve: {
    extensions: [".js",".cjs"],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({ parallel:true }),
    ],
    minimize: true, // enable minification when mode:'development', without this only mode:'producton' will minify
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Get Started Webpack',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/secretstatic", to: "secret" },
      ],
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
    },{
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },{
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
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

