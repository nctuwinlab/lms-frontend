const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, "app");
const BUILD_DIR = path.resolve(__dirname, "build");

let config = {
    context: APP_DIR,
    entry: {
        index: './index.jsx',
    },
    output: {
        filename: '[name].bundle.js',
        path: BUILD_DIR,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'es2017', 'react']
                    }
                }],
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ['style-loader', 'css-loader'],           
            },
            {
                test: /\.(sass|scss)$/,
                exclude: [/node_modules/],
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                exclude: [/node_modules/],
                use: ['file-loader'],
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    devServer: {
        contentBase: __dirname,
        compress: true,
        host: '0.0.0.0',
        port: 8080,
        publicPath: '/build/',
        allowedHosts: [
            'jubeatwww.com.tw'
        ],
    }
};

module.exports = config;
