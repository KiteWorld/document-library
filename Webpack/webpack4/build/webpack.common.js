const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	entry: path.join(__dirname, "../src/main.js"),
	output: {
		path: path.join(__dirname, "../dist"),
		filename: 'js/[hash:8].bundle.js'
	},
	resolve: {
		alias: {
			"@": path.join(__dirname, "../src")
		},
		extensions: [".js", ".vue", ".json"],
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/i,
				include: path.join(__dirname, "../src"),
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192, //小于 8K ，用 url-loader 转成 base64 ，否则使用 file-loader 来处理文件
							fallback: {
								loader: 'file-loader',
								options: {
									name: '[name].[hash:8].[ext]',
									outputPath: '../dist/images/', //打包之后文件存放的路径, dist/images
								}
							},

						}
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				include: path.join(__dirname, "../src"),
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							fallback: {
								loader: 'file-loader',
								options: {
									name: '[name].[hash:8].[ext]',
									outputPath: '../dist/media/',
								}
							},

						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				include: path.join(__dirname, "../src"),
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1,
							fallback: {
								loader: 'file-loader',
								options: {
									name: '[name].[hash:8].[ext]',
									outputPath: '../dist/fonts/',
								}
							},

						}
					}
				]
			},
			{
				test: /\.vue$/,
				include: path.join(__dirname, "../src"),
				// use: ["thread-loader", "cache-loader", "vue-loader"], // 项目大，loader 花费时间长时用
				use: ["vue-loader"]
			},
			{
				test: /\.js$/,
				include: path.join(__dirname, "../src"),
				// use: ["thread-loader", "cache-loader", "babel-loader"], // 项目大，loader 花费时间长时用
				use: ["babel-loader"]
			},
		]
	},
	plugins: [
		// 生成 HTML 并自动引入 bundle
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '../src/index.html')
		}),
		// 处理 .vue 文件
		new VueLoaderPlugin(),
		// 为模块提供中间缓存，不能和 SpeedMeasurePlugin 插件同时使用
		new HardSourceWebpackPlugin(),
		// 排除缓存 MiniCssExtractPlugin插件 
		new HardSourceWebpackPlugin.ExcludeModulePlugin([
			{
				test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
			},
		]),
	]
};