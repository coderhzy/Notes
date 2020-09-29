# CSRF攻防
CSRF（Cross site Requet Forgery）跨站点请求伪造。

## 防御
1. 尽量使用POST
2. 加入验证码
3. 验证Referer
4. Anti CSRF Token （最优）
- 在form表单或头信息中传递随机产生token。
- 随机token存储在服务端
- 服务端通过拦截器验证有效性
- 校验失败就拒绝请求
5. 加入自定义Header