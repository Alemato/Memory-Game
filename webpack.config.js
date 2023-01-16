const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {

    mode: 'development',
    //mode: 'production',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Memory Game',
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets" },
            ],
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true,
        port: 5000
    },
    watchOptions: {
        poll: true
    }

}
