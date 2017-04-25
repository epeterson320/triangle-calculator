const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./base');

const config = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index-hot.jsx',
  ],

  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?modules',
        'postcss-loader',
        'sass-loader',
      ],
    }],
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: baseConfig.output.path,
    publicPath: '/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = () => webpackMerge(baseConfig, config);
