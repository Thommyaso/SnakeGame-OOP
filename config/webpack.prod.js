const path = require('path');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const sprites = require('./webpack.sprites');
const common = require('./webpack.common');
const paths = require('./paths');

module.exports = merge(common, sprites, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackTagsPlugin({
            tags: [paths.prod.spritesStylesheet],
            append: true,
        }),
    ],
    output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, paths.prod.outputFolder),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, paths.main.styleFile),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ]},
});
