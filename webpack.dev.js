const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    // stats: 'verbose',
    module: {
        rules: [
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
        })
    ]
}
