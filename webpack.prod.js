const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    output: {
        filename: "main.[contentHash].js"
    },
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})],
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].[contentHash].css'}),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new WorkboxPlugin.GenerateSW(),
    ]
}
