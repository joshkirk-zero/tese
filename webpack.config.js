let webpack = require('webpack');
let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  module:{
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader'
      // },
    ]
  },
  entry: {
    'js/main': [
      path.resolve(__dirname, './app/js/main.js'),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: '[name]-min.js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new UglifyJsPlugin ({
      test: [
        /\.(js)$/i
      ],
      sourceMap: false,
      uglifyOptions: {
        ecma: 5,
        compress: {
          warnings: false
        }
      }
    }),
    new CopyWebpackPlugin([
      // FONTS
      {
        from: './app/fonts',
        to: './fonts',
        force: true
      },

      // IMAGES
      {
        from: './app/images',
        to: './images',
        force: true
      }

    ])
  ]
};
