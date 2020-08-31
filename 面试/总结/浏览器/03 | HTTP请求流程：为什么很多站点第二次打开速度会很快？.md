## 03 | HTTP请求流程：为什么很多站点第二次打开速度会很快？
![20200831083411](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831083411.png)
HTTP 是一种允许浏览器向服务器获取资源的协议，是 Web 的基础，通常由浏览器发起请求，用来获取不同类型的文件，例如 HTML 文件、CSS 文件、JavaScript 文件、图片、视频等。

**浏览器端发起 HTTP 请求流程**
1. 构建请求
2. 查找缓存:浏览器缓存是一种在本地保存资源副本
3. 准备 IP 地址和端口:HTTP 的内容是通过 TCP 的传输数据阶段来实现的
![20200831083644](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831083644.png)
浏览器会请求 DNS 返回域名对应的 IP。当然浏览器还提供了 DNS 数据缓存服务,并且获取端口号。
1. 等待 TCP 队列
同一个域名同时**最多**只能建立 6 个 TCP 连接,多出的等待。
5. 建立 TCP 连接
6. 发送 HTTP 请求: GET,POST
![20200831084011](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831084011.png)

**服务器端处理 HTTP 请求流程**
1. 返回请求
![20200831093048](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831093048.png)
2. 断开连接
在浏览器或者 服务器头中加入以下，会保持链接打开状态。
``` JS
Connection:Keep-Alive
```
保持 TCP 连接可以省去下次请求时需要建立连接的时间，提升资源加载速度
3. 重定向
响应行状态码301，代表需要重定向。重定向地址保存在Location中。
![20200831093544](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831093544.png)

### 1. 为什么很多站点第二次打开速度会很快？
DNS 缓存和页面资源缓存
![20200831093817](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831093817.png)

### 2. 登录状态是如何保持的？
输入用户名和密码登录，触发POST方法提交用户登录信息给服务器。服务器拿到提交信息，查询后台验证是否正确。
如果正确，会生成一段表示用户身份的字符串，写在Set-Cookie字段里，然后将响应头发送给浏览器。
浏览器解析响应头，遇到Set-Cookie字段保存在本地。下次用户访问的时候，浏览器优先使用Cookie加入请求头。
``` JS
Set-Cookie: UID=3431uad;
```
![20200831094620](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831094620.png)


**总结：**
![20200831094734](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200831094734.png)
八个阶段：构建请求、查找缓存、准备 IP 和端口、等待 TCP 队列、建立 TCP 连接、发起 HTTP 请求、服务器处理请求、服务器返回请求和断开连接。了解Cache流程和Cookie。

**小问题**
1. 如果一个页面的网络加载时间过久，你是如何分析卡在哪个阶段的？
网络传输丢包不断重传。或者本地客户端有问题。可以用wireshake爱来抓包查看。

2. 浏览器刷新操作，ctrl+F5和F5有什么区别
一个是强制刷新，也就是资源都走网络。一个是正常处理流程。