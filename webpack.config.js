const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");

/**
 * HTML Webpack Plugin
 * @desc Configuration for building the HTML page
 * @note Some props are injected and some are configuration (rendering) settings
 */
const htmlPlugin = new HtmlWebPackPlugin({
	title: "Agora",
	template: "./src/index.html",
	filename: "./index.html",
	favicon: "./assets/icon.ico",
	meta: {
		"viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
		"theme-color": "#f9f9f9"
	},
	minify: {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		useShortDoctype: true
	}
});

/**
 * External Node Module Inclusion
 * @desc Inject commonjs supported Node modules into our React application
 */
const nodeModules = {};
fs.readdirSync('node_modules').filter(function(x) {
	return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
	nodeModules[mod] = 'commonjs ' + mod;
});

/**
 * Webpack Configuration
 */
module.exports = {
	externals: nodeModules,
	entry: './src/App.js',
	target: 'electron-renderer',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: './',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
					/.json?/
				],
				use: {
					loader: 'babel-loader'
				}
			}, {
				test: /\.(s*)css$/,
				use: [
					{
						loader:'style-loader'
					}, {
						loader:'css-loader'
					}, {
						loader:'sass-loader'
					}
				]
			}
		]
	},
	plugins:[
		htmlPlugin
	],
	resolve: {
		extensions: ['.js','.jsx','.ts','.tsx']
	},
	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, 'build'),
		port: 4172
	}
}