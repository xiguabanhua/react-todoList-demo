var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './index.js',
    devtools:'eval',
    output: {
        path: path.join(__dirname,'public'),
        publicPath: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
                loader: 'babel',
                test: /\.jsx?$/,
                exclude: /node_modules/,
                 query: {
                    presets: ['es2015','react']
                },
            },
            { 
                test: /\.css$/,
                loaders: ['style', 'css', 'autoprefixer']
            },
            { 
                test: /\.less$/,
                loaders: ['style', 'css', 'autoprefixer', 'less']
            },
            { 
                test: /\.(jpg|png)$/, 
                loader: "url?limit=8192"
            }
        ]
    },
}

