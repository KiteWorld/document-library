const path = require('path');
const webpack = require("webpack");
//合并公用配置
const { merge } = require('webpack-merge')
// 使用 HardSourceWebpackPlugin 时，不要使用 speed-measure-webpack-plugin 会报错
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
const webpackCommon = require('./webpack.common.js')
module.exports = merge(webpackCommon, {
	mode: "development",
	devtool: "cheap-module-eval-source-map",
	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		compress: true,
		open: true,
		quiet: false,
		hot: true, //开启热更新
		port: 3000,
		clientLogLevel: 'none',  //关闭浏览器控制台输出的热更新信息
	},
	module: {
		rules: [
			{
				test: /\.(css)$/,
				include: path.join(__dirname, "../src"),
				use: [
					"style-loader",
					// "thread-loader", // 项目大，loader 花费时间长时用
					"css-loader",
					"postcss-loader"
				]
			},
			{
				test: /\.(less)$/,
				include: path.join(__dirname, "../src"),
				use: [
					"style-loader",
					// "thread-loader", // 项目大，loader 花费时间长时用
					"css-loader",
					"postcss-loader",
					"less-loader",
				]
			},
		]
	},
	plugins: [
		// 热更新
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				//开发环境，设置全局变量可以在整个项目中调用
				BASE_URL: JSON.stringify('http://localhost:3000/dev')
			}
		})
	]
});