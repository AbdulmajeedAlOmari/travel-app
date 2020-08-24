const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { merge } = require('webpack-merge')

const commonConfig = merge([
  {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[hash].[ext]',
                    outputPath: 'assets/img',
                    esModule: false
                  }
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    bypassOnDebug: false,
                    disable: false,
                    webp: {
                      quality: 90
                    }
                  },
                },
              ]
            },
            {
                test: /\.scss$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                      plugins: function () {
                        return [
                          require('precss'),
                          require('autoprefixer')
                        ];
                      }
                    }
                  },
                  'sass-loader' ]
            },
            {
              test: /\.html$/i,
              loader: 'html-loader',
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
          // Simulate the removal of files
          dry: true,
          // Write Logs to Console
          verbose: true,
          // Automatically remove all unused webpack assets on rebuild
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: false
        }),
        new MomentLocalesPlugin()
    ]
  },
]);

const productionConfig = require('./webpack.prod')
const developmentConfig = require('./webpack.dev')

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  } else if (mode === 'development') {
    return merge(commonConfig, developmentConfig, { mode })
  } else {
    throw new Error("Mode must be either (development) or (production)")
  }
}