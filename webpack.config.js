const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js'
    },
    plugins:[
        new HTMLWebpackPlugin({
            title: "Test Template",
            template: path.resolve(__dirname,"./src/template.html")
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module:{
        rules:[
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline'
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    mode: 'development',
    devServer:{
        historyApiFallback: true,
        contentBase: path.resolve(__dirname,"./dist"),
        open:true,
        compress: true,
        hot: true,
        port:8080,
    }
}