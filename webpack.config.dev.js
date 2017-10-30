var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  {
	devtool: 'inline-source-map',
	entry: path.resolve(__dirname, 'client/app/app'),
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'client/index.html',
			inject: true
		}),
		new ExtractTextPlugin('app.css'),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [ 'css-loader', 'sass-loader' ]
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: [ 'style-loader', 'css-loader' ]
				})
			},
			{ test: /\.html$/, use: 'raw-loader' },
			{
				test: '/\.js$/',
				exclude: /node_modules/,
				use: ['babel-loader']

			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: 'url-loader?limit=100000'
			}
		]
	}
}