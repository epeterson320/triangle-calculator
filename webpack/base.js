const { resolve } = require('path')

module.exports = {
  resolve: {
    extensions: ['.webpack.js', '.js', '.jsx']
  },

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  context: resolve(__dirname, '../src'),

  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.svg$/,
      use: ['babel-loader', 'svg-react-loader'],
      exclude: /node_modules/
    }]
  }
}
