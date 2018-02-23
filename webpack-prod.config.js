var conf = require('./webpack.config');
var strip = require('strip-loader');
var stripLoader = {
    test: /\.js/,
    exclude: [/node_modules/,/angular/],
    use: strip.loader('console.log')
};
conf.module.rules.push(stripLoader);
module.exports = conf;