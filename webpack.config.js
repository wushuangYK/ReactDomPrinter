/**
 * Created by wushuang on 2018/1/18.
 */
const path = require('path');

const config = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [["env"],["react"]],
                    plugins: [
                        "transform-class-properties"
                    ]
                }
            }
        ]
    }
};

module.exports = config;