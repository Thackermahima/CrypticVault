const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = { 
    resolve: {
        fallback: { crypto: false },
        alias: {
            path: require.resolve("path-browserify")
        }, 
    }, 
    plugins: [
        new NodePolyfillPlugin()
    ], 
};