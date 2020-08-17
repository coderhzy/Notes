// webpack use node
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'development',
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
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: { //模块
    // loader
    rules: [ //规则 css-loader  解析 @import语法
      // style-loader 将css插入的head标签中
      // loader特点 希望单一
      // loader的用法：1、 只用字符串 2、 多个loader需要一个数组 
      // 注意使用loader 的顺序 ，默认是从右向左执行,从下到上执行
      // loader还可以写成对象方式
      {
        // 可以处理less文件
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        // TODO: 未知原因，div的外边框不显示。
        // 可以处理less文件 sass stylus node-sass sass-loader
        // stylus stylus-loader
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // @import 解析路径
          'postcss-loader',
          'less-loader', //把less ——> css
        ]
      },
    ]
  }
}