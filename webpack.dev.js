const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    // stats: 'verbose',
    module: {
        rules: [
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
        })
    ]
}
