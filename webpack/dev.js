const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base')

const config = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index-hot.jsx'
  ],

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }]
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: baseConfig.output.path,
    publicPath: '/',
    overlay: {
      errors: true,
      warnings: true
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index-hot.ejs',
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}

module.exports = () => webpackMerge(baseConfig, config)
