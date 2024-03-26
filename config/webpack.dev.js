const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');

module.exports = merge(common, {
    mode: 'development',
    plugins: [new ESLintPlugin({
        fix: true,
    })],
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, paths.dev.outputFolder),
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, paths.dev.serverFolder),
        },
        compress: true,
        watchFiles: {
            paths: [
                paths.main.watchHtml,
            ],
        },
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, paths.main.styleFile),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]},
});
