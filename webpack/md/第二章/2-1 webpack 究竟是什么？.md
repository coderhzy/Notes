## 面向对象
1. Es Moundule 模块引入方式
2. 核心定义：webpack是模块打包工具
3. CommonJS,CMD,ADM 模块引入

```js
// Es Moundule 模块引入方式
import Sidebar from './sidebar'
import Content from './content'
new Header();
new Sidebar();
new Content();
export default Content;

// CMD
var Header = require('./header');
var Sidebar = require('./sidebar');
var Content = require('./content');
new Header();
new Sidebar();
new Content();
module.exports = Content;
```
## webpack运行方式

### 建议局部安装
sudo npm install webapck --save-dev
sudo npm install webapck-cli --save-dev
sudo npm install webapck@2.0.0 --save-dev
1. webpack index.js
2. npx webpack index.js
3. npm run bundle -> webpack

### 打包结果
```md
**打包结果**

Hash: c406c6ec15d28adc8ca7
Version: webpack 4.43.0
Time: 57ms
Built at: 2020/07/11 下午8:37:22
    Asset      Size  Chunks             Chunk Names
bundle.js  5.58 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/content.js] 225 bytes {main} [built]
[./src/header.js] 216 bytes {main} [built]
[./src/index.js] 269 bytes {main} [built]
[./src/sidebar.js] 223 bytes {main} [built]
```


## Loader
styleloder,Cssloader,sassloader,postcss-loader
```js
// importLoader:2 防止在scss文件中引入scss，嵌套打包
{
          loader: 'css-loader',
          options: {
            importLoaders: 2 , //importLoader:2 防止在scss文件中引入scss，嵌套打包
            modules: true, // 用style引入scss
                            // 可以用style.作为前缀,使得样式独立
          }
        }
// 打包第三方库
{
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader'
      }
    }
```

htmlWebpackPlugin：在打包结束后，自动生成一个html文件，并把打包生成的js自动引入这个htnl文件中
plugin: 可以在webpack运行到某个时刻，可以帮我们做一些事情。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
})],
```

#### output
```js
output: {
  publicPath: 'http://cdn.com.cn/',
  filename: '[name].js',
  path: path.resolve(__dirname,'./dist'),
},
```
#### entry
```js
entry: {
  main: './src/index.js',
  sub: './src/index.js'
},
```

## sourceMap
打包以后代码报错，代码映射文件位置的管理。


## WebpackDevServer
```js
  "scripts": {
    "watch": "webpack --watch"
  }
```
```js
  devServer: {
    contentBase: './dist',
    open: true
  },
```