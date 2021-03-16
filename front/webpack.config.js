const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('webpack-copy-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "./main.js",
        chunkFilename: "[name].bundle.js",
        publicPath: "/",
    },
    devServer: {
        compress: true,
        port: 3000,
        watchContentBase: true,
        progress: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:4200',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CopyPlugin({ dirs: [
            { from: "./public"},
            ]}),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ],
    module: {
        rules: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
            { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
            { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
            { test: /\.jpe?g(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/jpeg' },
            { test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/png' }
        ]
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:4200/api'
        })
    },
};
