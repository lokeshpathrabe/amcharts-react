const Path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const entryPoints = require('../scripts/libEntryPoints.js');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: entryPoints,
  output: {
    filename: '[name]/index.js',
    path: Path.resolve(__dirname, '../dist'),
    library: 'amcharts-react',
    libraryTarget: 'umd',
  },
  externals: [
    {
      react: 'react',
      '@amcharts/amcharts4/core': {
        commonjs: '@amcharts/amcharts4/core',
        commonjs2: '@amcharts/amcharts4/core',
        root: 'am4core',
      },
      '@amcharts/amcharts4/charts': {
        commonjs: '@amcharts/amcharts4/charts',
        commonjs2: '@amcharts/amcharts4/charts',
        root: 'am4charts',
      },
      '@amcharts/amcharts4/themes/animated': {
        commonjs2: '@amcharts/amcharts4/themes/animated',
        commonjs: '@amcharts/amcharts4/themes/animated',
        root: 'am4themes_animated',
      },
    },
    function (context, request, callback) {
      if (/(xlsx|canvg|pdfmake)/.test(request)) {
        callback(null, `commonjs ${request}`);
      }
      callback();
    },
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      // not needed for now
      // {
      //   test: /.js$/,
      //   use: ["source-map-loader"],
      //   enforce: "pre",
      // },

      //Currently file loader is not needed. Also causes svg to be copy pasted in dist folder
      // {
      //   test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[path][name].[ext]",
      //     },
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['url-loader'],
      },
    ],
  },
});
