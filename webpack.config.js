const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};

// Attach Node modules into our React application
fs.readdirSync('node_modules').filter(function(x) {
	return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
	nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
	externals: nodeModules,
	entry: [
		'./src/App.js'
	],
	target: 'node',
	output: {
		path: __dirname,
		publicPath: '/public',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				exclude: [
					/node_modules/,
					/.json?/
				],
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-1']
				}
			}, {
				test: /\.(s*)css$/,
				use: ['style-loader','css-loader','sass-loader']
			}
		]
	},
	resolve: {
		extensions: ['.js','.jsx','.ts','.tsx']
	},
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		port: 4172
	}
};