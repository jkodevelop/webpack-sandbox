const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// custom parser libraries
const yaml = require('yamljs');

module.exports = {
  mode: 'development',
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Get Started Webpack',
    }),
  ],
  module: {
    rules: [{
      test: /\.(sc|sa|c)ss$/i,
      use: [
        // webpack's rules order
        // step 3: inject CSS into the DOM
        'style-loader',
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

