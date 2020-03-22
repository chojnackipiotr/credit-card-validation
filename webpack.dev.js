const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8888,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true,
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HTMLWebpackPlugin({
    template: './src/template.html',
  })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
