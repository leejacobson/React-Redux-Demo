var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const Dotenv = require('dotenv-webpack');

var BUILD_DIR = path.resolve(__dirname, 'src/public/js');
var APP_DIR = path.resolve(__dirname, 'src/app/js');

module.exports = {
  entry: APP_DIR + '/scripts.js',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
		  plugins: ['react-html-attrs',
			'transform-decorators-legacy',
			'transform-class-properties',
			'transform-object-rest-spread'],
        }
      },
	  {
		  test: /\.css$/,
		  exclude: /(node_modules|bower_components)/,
		  loader: 'style-loader!css-loader'
	  },
	  {
		  test: /\.less$/,
		  exclude: /(node_modules|bower_components)/,
		  loader: 'style-loader!css-loader!less-loader'
		  
	  },
	  {
		  test: /\.json$/,
		  exclude: /(node_modules|bower_components)/,
		  loader: 'json-loader'
		  
	  }
	]
  },
  output: {
    path: BUILD_DIR,
    filename: "/scripts.min.js",
	publicPath: 'js/',
  },
  plugins: debug ? [
	new Dotenv(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	new Dotenv(),
  ],
};