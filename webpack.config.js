const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    context: path.resolve('public'),
    entry: {
        js: "./app.js",
        'all-default.css': "./build-default.js",
        'all-ocean.css': "./build-ocean.js",
        'all-robust.css':"./build-robust.js"
    },
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "./js/bundle.js"
    },
    module:{
        rules:[
            {test: /\.js/,exclude:[/node_modules/,/angular/,/bootstrap/], use:'babel-loader'},
            {test: /\.html/, use: 'raw-loader', exclude: [/node_modules/,/angular/,/bootstrap/]},
            {test: /\.json$/,use:'json-loader'},
            {
                test:/all-.*.less$/,
                exclude:[/node_modules/,/bootstrap/],
                use:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{ loader: 'css-loader', options: { importLoaders: 2 } },
                        "autoprefixer-loader",
                        "less-loader",
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: "./images/[name].[ext]"
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name]"
        })
    ]
};