module.exports = {
   context: __dirname + "/src",
    entry: "./client.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel?stage=0", query:
              {
                presets:['react']
              }
            }
        ]
    }
};
