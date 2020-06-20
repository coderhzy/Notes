[toc]
# VSCode+Markdown+PicGo

我今天我解决了一直以来困扰我的问题，希望对大家的学习过程有所帮助。我们将来实现用VSCode编写Markdown笔记，并让你的图片作为云端存储，随意发布到各大网站上，再也不会遇到图片在不同的地方不被解析的问题。

## Markdown

VSCode编辑器的插件有很多，我们需要下载一个支持Markdown的插件。名叫:**<font color=red>Markdown All in One</font>**
![20200609180035](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609180035.png)
<center>Markdown All in One</center>

有兴趣的朋友还可以下载一个Markdown在VSCode上面显示增强的查缴。名叫:**<font color=red>Markdown Preview Enhanced</font>**
![20200609180407](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609180407.png)
<center>Markdown Preview Enhanced</center>

## PicGo
我们在VScode插件搜索，名叫:**<font color=red>PicGo</font>**
![20200609180550](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609180550.png)
<center>PicGo</center>

![20200609180609](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609180609.png)
<center>PicGo上传快捷键</center>

## 自建图床
我们自建云存储桶，然后通过PicGO插件来将图片自动托管到云存储桶，这也就是我们所说的**图床**。

当然PicGo支持多种存储。这里我们使用腾讯云cos,不过七牛云免费，足够大家用的，可以选择使用七牛云。 
![20200609181212](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609181212.png)
<center>PicGo支持</center>


### 注册腾讯云
![20200609181418](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609181418.png)
<center>开启cos存储桶</center>

## VSCode
1. 打开VSCode的设置
![20200609181636](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609181636.png)
<center>VSCode设置</center>

2. 找到PicGo
![20200609181755](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609181755.png)
<center>PicGO-Setting</center>

3. 配置PicGo
![20200609182002](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609182002.png)

![20200609182057](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609182057.png)

- Access Key ID和Access Key Secret是我们创建cos时候在云端可以查看的

- Area是我们的地域（英文），ap-shanghai

- Bucket 是我们创建的云存储桶名称

- Custom Url是我们腾讯云云存储桶的域名https://xxxxxxxx.cos.ap-shanghai.myqcloud.com

- path是我们文件目录，在云存储桶中新建目录，比如我的目录是 2020/pictures/

![20200609182152](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609182152.png)

![20200609182620](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/pictures/20200609182620.png)

## END
这时候我们就可以通过上方我们看到的PicGo快捷键通过不同方式上传图片到图床了。