const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'auraria-client.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'auraria',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.yaml$/,
                use : ['js-yaml-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};