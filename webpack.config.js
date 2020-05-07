const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve( __dirname, 'public' ),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.scss/i,
				use: [ MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader' ],
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new MiniCssExtractPlugin( {
			filename: 'bundle.css'
		} ),
	],
	devServer: {
		open: true,
	}
};
