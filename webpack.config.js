const path = require('path');


module.exports = {
    entry: __dirname + '/front-end/src/app.js',
    output: {
        path: path.resolve(__dirname, 'front-end/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: 'babel-loader'}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "front-end/src"),
        compress: false,
        port: 9000,
        hot: true
    }
}
