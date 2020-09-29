# oAuth2
- 作用： 第三方登录。
- 解决的问题： 任何身份验证起始于对第三方网站或者应用的不信任来出现的。
- 资源所有者
## 协议角色的流程
1. 资源所有者（resoutce owner）
2. 客户端/第三方应用（client）
3. 资源服务器（resource server
4. 授权服务器（authorization server）

第一步： 客户端向资源所有着发送一个授权请求。当我们点击授权许可以后，就会拿到一个授权许可。

第二步：当client拿到授权许可以后，拿着这个授权的code去访问授权服务器。如果code有效，返回access Token。

第三步：client拿着token授权资源服务器获取资源。授权服务器返回对应资源。

## oAhuth2授权
授权所需要信息：
- 应用名称
- 应用网站
- 重定向URI或回调URL（redirect_uri）
- 客户端标识 client_id
- 客户端密钥 client_sercet

## 授权方式
1. 授权码模式（authorization code）
客户端 -> 资源服务器授权返回给客户端 -> 客户端（code + client_id + client_secret + scope）拼接 —> 请求授权服务器（请求验证code）返回token -> 客户段用token去访问服务端的资源管理器获取资源。
2. 简化模式
服务端返回的token会暴露在url输入栏。
3. 密码模式
用户点击登录的时候，不是授权，而是输入账号密码。输入账号密码以后，网站会拿着这个账号密码去验证是否有效。此方法不安全。
4. 客户端模式
直接通过客户端密钥或者id来获取一个token。 