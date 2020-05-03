const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	entry: {
		'tlg-script' : './game/_index.jsx',
	},
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'js/[name].min.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [ './game/_essentials/_essentials.scss' ],
						}
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: 'css/[name].min.css',
		} )
	]
};