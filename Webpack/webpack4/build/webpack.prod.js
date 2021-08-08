const webpack = require("webpack");
const path = require('path');
//合并公用配置
const { merge } = require('webpack-merge')
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
const webpackCommon = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(webpackCommon, {
	mode: "production",
	// devtool: "cheap-module-source-map",
	devtool: false,
	optimization: {
		minimizer: [
			// 压缩 JS
			new TerserPlugin({
				parallel: true, //开启多线程
				sourceMap: true, // 如果使用了 SourceMapDevToolPlugin ，需要设置为 true
				extractComments: false, // 默认打包会生成 LICENSE.txt  文件，这里设置禁止生成
				terserOptions: {
					output: {
						comments: false, //删除注释
					},
					compress: {
						drop_console: true //删除 console
						// drop_debugger: false //默认为 true, 会删除 debugger
					},
				},

			}),
		],
	},
	externals: {
		"vue": "Vue",
		"vue-router": "VueRouter"
	},
	module: {
		rules: [
			{
				test: /\.(css)$/,
				include: path.join(__dirname, "../src"),
				use: [
					MiniCssExtractPlugin.loader,
					// "thread-loader", // 项目大，loader 花费时间长时用
					"css-loader",
					"postcss-loader"
				]

			},
			{
				test: /\.(less)$/,
				include: path.join(__dirname, "../src"),
				use: [
					MiniCssExtractPlugin.loader,
					// "thread-loader", // 项目大，loader 花费时间长时用
					"css-loader",
					"postcss-loader",
					"less-loader",
				]
			},
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				//生产环境，设置全局变量可以在整个项目中调用
				BASE_URL: JSON.stringify('http://localhost:3000/prod')
			}
		}),
		// 代替 devtool 生成 sourcemap，自定义名称和路径
		new webpack.SourceMapDevToolPlugin({
			append: '\n//# sourceMappingURL=http://localhost:1888/sourcemaps/[name].[hash:8].map',
			filename: 'sourcemaps/[name].[hash:8].map',
		}),
		// 提取 css
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].css'
		}),
		// 压缩 css
		new OptimizeCssAssetsPlugin(),
		// // 使用 dll ，配合 DllPlugin使用，不推荐和 HardSourceWebpackPlugin 一起使用
		// new webpack.DllReferencePlugin({
		// 	manifest: path.join(__dirname, "../dist/dll", "vue.manifest.json") //manifest.json的生成路径
		// }),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
		}),
	],

})
