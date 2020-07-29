const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
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
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                'file-loader?outputPath=resources/images/',
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new CleanWebpackPlugin({
          // Simulate the removal of files
          dry: true,
          // Write Logs to Console
          verbose: true,
          // Automatically remove all unused webpack assets on rebuild
          cleanStaleWebpackAssets: true,
          protectWebpackAssets: false
      }),
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