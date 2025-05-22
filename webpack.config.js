const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  resolve: {
    extensions: [".js",".cjs"],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
    }],
  },
};

