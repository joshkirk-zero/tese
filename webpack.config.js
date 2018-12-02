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
      path.resolve(__dirname, './src/js/main.js'),
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

      // This plugin copies relevant directories to the build folder
      // on change so the build folder always the latest of everything
      // needed to work.

      // MARKUP
      {
        from: './src/index.html',
        to: './',
        force: true
      },
      {
        from: './src/dfs-fulfillment.html',
        to: './',
        force: true
      },
      {
        from: './src/facebook-careers.html',
        to: './',
        force: true
      },
      {
        from: './src/laquinta-hotels.html',
        to: './',
        force: true
      },
      {
        from: './src/microsoft-teams.html',
        to: './',
        force: true
      },


      // FONTS
      {
        from: './src/fonts',
        to: './fonts',
        force: true
      },

      // IMAGES
      {
        from: './src/images',
        to: './images',
        force: true
      }

    ])
  ]
};
