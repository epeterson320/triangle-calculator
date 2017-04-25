const { resolve } = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  context: resolve(__dirname, '../src'),

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader?modules',
        'postcss-loader',
        'sass-loader',
      ],
    }],
  },
};
