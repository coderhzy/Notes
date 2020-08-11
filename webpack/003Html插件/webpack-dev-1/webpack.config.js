// webpack use node
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devServer: {
    // 开发服务器配置
    port: 3000,
    progress: true,
    contentBase: './dist',
    open: true,
    compress: true
  },
  mode: 'production', //模式 默认两种 production development
  entry: './src/index.js', //入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist'), //路径必须是一个绝对路径
  },
  plugins: [ //数组中放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true, //打包成一行
      },
      hash: true
    })
  ]
}