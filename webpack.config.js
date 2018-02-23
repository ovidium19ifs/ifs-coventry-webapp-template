const path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
module.exports = {
    context: path.resolve('public'),
    entry: {
        js: "./app.js",
    },
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "./js/bundle.js"
    },
    module:{
        rules:[
            {test: /\.js/,exclude:[/node_modules/,/angular/,/bootstrap/], use:'babel-loader'},
            {test: /\.html/, use: 'raw-loader', exclude: [/node_modules/,/angular/,/bootstrap/,/textparagraph/]},
            {test: /\.json$/,use:'json-loader'}
        ]
    },
    plugins: [
        new ngAnnotatePlugin({
            add:true
        })
    ]
};