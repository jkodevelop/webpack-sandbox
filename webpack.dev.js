const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env) => {

  // this controls the mode: and new Dotenv(path)
  const mode = 'development'; 
  const args = { mode };

  return merge(common(args), {
    devtool: 'inline-source-map',
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true, // enable: gzip
      port: 9000,
      hot: true,
    },
    optimization: {
      runtimeChunk: 'single',
    },
    module: {
      rules: [{
        test: /\.(sc|sa|c)ss$/i,
        use: [
          // webpack's rules order
          // step 3: extract the css into an external stylesheet .css file
          'style-loader',
          // step 2: Tranlates CSS into CommonJS
          'css-loader',
          // step 1: Compiles Sass to CSS
          'sass-loader'],
      }],
    },
  });

};