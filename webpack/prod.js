const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./base');

const config = {
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx'],
  },
  entry: './index.jsx',

  plugins: [
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true, keep_fnames: true },
      compress: { screw_ie8: true },
      comments: false,
    }),
  ],
};

module.exports = () => webpackMerge(baseConfig, config);
