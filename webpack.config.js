const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

const entryPath = "src";

module.exports = {
    mode: "none",
    entry: `./${entryPath}/js/Index.js`,
    devtool: "inline-source-map",
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, "build"),
        clean: true,
    },
    devServer: {
        open: true,
        hot: true,
        static: [
            {
                directory: path.join(__dirname, entryPath),
                publicPath: "/",
                serveIndex: true,
            },
        ],
        devMiddleware: {
            writeToDisk: true,
        },
        compress: true,
        port: 3000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['autoprefixer']],
                            },
                        },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            }
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: entryPath +"/index.html",
            inject: false
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        new Dotenv({
                systemvars: true
            }
        ),
    ],
};