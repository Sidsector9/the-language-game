const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = {
	entry: {
		'tlg-game': './src/index.jsx',
	},
	output: {
		path: path.resolve( __dirname, 'docs' ),
		filename: '[name]-[hash].js',
	},
	module: {
		rules: [
			{
				test: /\.js|.jsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'resolve-url-loader',
					'postcss-loader',
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
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin( {
			template: 'index.ejs',
			inject: 'body',
		} ),
		new MiniCssExtractPlugin( {
			filename: '[name]-[hash].css'
		} ),
		new OptimizeCssAssetsPlugin(),
	],
	devServer: {
		open: true,
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin( {
				test: /\.js|.jsx$/,
				exclude: /\/node_modules/
			} )
		],
	},
};
