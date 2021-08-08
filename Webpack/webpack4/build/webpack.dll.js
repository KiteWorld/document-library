

const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		vue: ['vue', 'vuex', 'vue-router']
	},
	mode: 'production',
	output: {
		filename: '[name].dll.js',
		path: path.join(__dirname, '../dist/dll'),
		library: '[name]_dll' //暴露给外部使用
	},
	plugins: [
		// 生成 dll，提取公用依赖，下次构建项目时需要构建这一部分，提高构建速
		new webpack.DllPlugin({
			name: '[name]_dll',
			path: path.join(__dirname, "../dist/dll", "[name].manifest.json") //manifest.json的生成路径
		})
	]
}
