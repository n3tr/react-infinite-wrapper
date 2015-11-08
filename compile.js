var webpack = require('webpack');
var webpackConfig = require('./webpack.config');


var compiler = webpack(webpackConfig);
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
  
}, function(err, stats) {
    console.log(stats);
});
