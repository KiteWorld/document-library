const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	mode: "development",
	entry: "/src/main.js",
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "./dist"),
		open: true,
		quiet: true,
		progress: true,
		hot: true, //开启热更新
		clientLogLevel: 'none',  //关闭浏览器控制台输出的热更新信息
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192, //小于 8K ，用 url-loader 转成 base64 ，否则使用 file-loader 来处理文件
							fallback: {
								loader: 'file-loader',
								options: {
									name: '[name].[hash:8].[ext]',
									outputPath: 'images/', //打包之后文件存放的路径, dist/images
									// publicPath: 'assets/' // 拼接在url的目录，不设置默认使用 outputPath 的路径
								}
								// 路径也可以直接写在 name 上，和上面效果一致
								//  options: {
								// 	 name: 'images/[name].[hash:8].[ext]',
								//  }
							},

						}
					}
				]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							fallback: {
								loader: 'file-loader',
								options: {
									name: '[name].[hash:8].[ext]',
									outputPath: 'media/',
								}
							},

						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1,
							fallback: {
								loader: 'file-loader',
								options: {
									name: '[name].[hash:8].[ext]',
									outputPath: 'fonts/',
								}
							},

						}
					}
				]
			},
			{
				test: /\.(css)$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.(less)$/,
				use: [
					"style-loader",
					"css-loader",
					"less-loader",
					"postcss-loader",
				]
			},
			{
				test: /\.vue$/,
				use: ["vue-loader"]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin()
	]
};