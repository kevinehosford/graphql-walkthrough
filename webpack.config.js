/**
 * @overview webpack configuration
 * @module webpack.config
 *
 * @requires webpack
 * @requires path
 * @requires html-webpack-plugin
 * @requires babel-loader
 * @requires eslint-loader
 * @requires style-loader
 * @requires css-loader
 * @requires postcss-loader
 * @requires postcss-import
 * @requires postcss-cssnext
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cssImport = require('postcss-import');
const cssNext   = require('postcss-cssnext');

module.exports = {

  debug: true,

  /**
   * @see {@link https://webpack.github.io/docs/configuration.html#devtool}
   */
  devtool: 'source-map',

  entry: {
    app: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client?reload=true',
      './src/app.js',
    ],
  },

  output: {
    publicPath: '/public/',
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    pathinfo: true,
  },

  module: {

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel',
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss',
        ],
      },
    ],
  },

  postcss: wp => ([
    cssImport({ addDependencyTo: wp }),
    cssNext(),
  ]),

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'GraphQL Walkthrough',
      template: 'src/index.html',
    }),
  ],
};
