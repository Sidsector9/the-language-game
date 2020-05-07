const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );

module.exports = {
	entry: {
		'tlg-game': './src/index.jsx',
	},
	output: {
		path: path.resolve( __dirname, 'public' ),
		filename: '[name]-[hash].js',
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
			filename: '[name]-[hash].css'
		} ),
		new OptimizeCssAssetsPlugin(),
	],
	devServer: {
		open: true,
	}
};
