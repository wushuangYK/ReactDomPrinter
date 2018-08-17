/**
 * Created by wushuang on 2018/8/17.
 */
const path = require("path");

module.exports = {
    mode: "development",
    //入口文件
    entry: {
        main: './index.js'
    },
    //出口文件
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: "[name].js",
        publicPath: '/lib/'
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
                        "transform-class-properties",
                    ]
                }
            }
        ]
    },
    plugins: []
};