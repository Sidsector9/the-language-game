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
				test: /\.js|.jsx$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'resolve-url-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [ './src/game/_essentials/_essentials.scss' ],
						},
					},
				],
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin( {
			template: 'index.html',
			inject: 'body',
		} ),
		new MiniCssExtractPlugin( {
			filename: 'bundle.css'
		} ),
	],
	devServer: {
		open: true,
	}
};
