const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: path.resolve( __dirname, 'public' ),
		filename: 'bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin(),
	],
};
