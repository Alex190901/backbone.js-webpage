'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const webpackCommon = {
    entry: {
        app: ['./public/js/app.js']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader?presets[]=es2015'
                    }
                ]
            },
            {
                test: /\.jst$/,
                use: {
                    loader: 'underscore-template-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },
    output: {
        filename: './public/js/App.bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new CopyWebpackPlugin([{
            from: './app/assets/indx.html',
            to: './index.html'
        }]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'underscore'
        })
    ],
    resolve: {
        modules: [
            path.join(__dirname, './node_modules'),
            path.join(__dirname, './app')
        ]
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, './node_modules')
        ]
    }
};

switch (process.env.npm_lifecycle_event) {
    // case 'start':
    // case 'dev':
    //     module.exports = merge(webpackCommon, {
    //         devtool: '#inline-source-map',
    //         devServer: {
    //             contentBase: path.join(__dirname, 'public'),
    //             compress: true,
    //             port: 9019
    //         }
    //     });
    //     break;
    default:
        module.exports = merge(webpackCommon, {
            devtool: 'source-map'
        });
        break;
}
