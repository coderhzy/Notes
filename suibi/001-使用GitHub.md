# 关于 GitHub

# 前期准备
安装git [官网](https://git-scm.com/)，下载适合系统。Mac系统安装完毕，打开终端：


```markdown
$ git --version    //有返回版本则安装完成
```




1.
## 创建Github账户
[https://github.com/](https://github.com/)  ---> Pricing and Signup ---> Create a free account
```markdown
//打开终端设置username和email
git config --global user.name "xxxxxxx"
git config --global user.email "xxxxxxx@xxxxxx.com"
```


2.
## 创建SSH公钥
```markdown
$cd ～/.ssh  //检查是否已经存在ssh

//如果没有提示:No such file or directory说明你不是第一次使用git,执行下面的操作,清理原有ssh密钥
//删除公钥
$ mkdir key_backup
$ cp id_rsa* key_backup
$ rm id_rsa*

生成公钥
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"   //git绑定邮箱
```


3.
## 查看公钥
```markdown
打开终端:
cat ~/.ssh/id_rsa.pub    //查看生成的公钥并且复制下
```


![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906604900873.jpg)


4.
## 在本地添加git账户和邮箱
```markdown
git config --global user.name "你的注册用户名"
git config --global user.emall "你的注册邮箱"
```
# 
5.
## 添加公钥
在github中添加ssh：
登陆github，选择Account Settings-->SSH  Keys 添加ssh
Title：xxxxx[@xxxx.com ]() //注册gitHub的邮箱
Key:  刚才查询的公钥
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906604990423.jpg)




6.
## 测试账号与git的链接
```markdown
ssh -T git@github.com 
//此处是GitHub官网，如果出现如下提示，表示你连已经连上了。
//如果成功，接下来就可以管理你的代码了。
```
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906605136950.jpg)




7.
## 远程建工程并与本地交互
在github下建自己的Repository。Create a New Repository如下：
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906605273761.jpg)


- Repository name:通常就写自己自己要建的工程名。
- Description：就是你对工程的描述了。
- 选择Public。
- 点击 “Create repository”,出现如下图：
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906605396765.jpg)




## 常用命令及用法一览
当电脑第一次使用（意思是输入一次，本电脑终身有用）：
```markdown
git init  //git 初始化 （进本地目录以后）  
git remote add origin url     //url : 新建工程的url
```


### 切换仓库
```markdown
git remote add origin git@github.com:xxxxxx/xxx.git
//随便找一个SSH复制进来（自己仓库）

git remote rm origin

1.git remote 不带参数，列出已经存在的远程分支
2.git remote -v | --verbose 列出详细信息，在每一个名字后面列出其远程url，此时， -v 选项(译注:此为 –verbose 的简写,取首字母),显示对应的克隆地址。
3.git remote add url   添加一个远程仓库
```


```markdown
本地创建新分支
git checkout -b branchname
```


### 提交
```markdown
git add .   //本目录下所有修改工程提交至本地仓库
git commit -m "up"  //必须步骤，为更新做描述  
git push origin master  //将本地仓库更新至远程仓库
```


### 添加新文件
```markdown
git add .     //添加本目录下所有新添加的文件  
git commit -m "up"  //描述添加文件  
git push origin master   //更新
```


### 删除文件
```markdown
git add .   //添加本目录下所有新更新的文件  
git commit -m "de"    //描述文件  
git rm "文件"    //删除文件  
git push origin master //更新
```


### 下载工程
```markdown
git clone url   //url 是远程url  
远程相对本地的更新：
git pull origin master
```


### 切换分支
```markdown
//切换到分支“static-pages”:

$ git checkout static-pages
$ git add .
$ git commit -m "Add a Static Pages controller" //“”中表明你给某个完成的进度取个名字
$ git push origin master 或 git push
```


### 作修改后合并到主分支
```markdown
$ git add .
$ git commit -m "Finish static pages"
$ git checkout master
$ git merge static-pages
$ git push
```


以上命令基本够用了~~


转载：
[转载1](https://blog.csdn.net/u010812071/article/details/89196708)
[转载2](https://www.cnblogs.com/snowlove/p/6095673.html)


## 
# 后期使用
## 新建分支并上传
```markdown
1) 切换到基础分支，如主干
git checkout master
2）创建并切换到新分支
git checkout -b panda
git branch可以看到已经在panda分支上
3)更新分支代码并提交
git add *
git commit -m "init panda"
git push origin panda
4)在git代码管理界面经可以看到panda分支了
```


## 清理本地分支
```
git remote prune origin
```


## 删除远程分支


```markdown
git push origin –delete 分支名
```






## 关于git clone终端下载缓慢
连接代理后mac终端不走代理的解决方法。 
连接ss后，mac的终端默认是不走代理的。
下面解决方法(重启终端失效)

### 方法一
打开终端
```markdown
# 配置http访问
        export http_proxy=socks5://127.0.0.1:1080
# 配置https访问
        export https_proxy=socks5://127.0.0.1:1080
# 配置http和https访问
        export all_proxy=socks5://127.0.0.1:1080
# 测试是否成功
				curl ip.sb      		//有返回当前ip地址则成功
```


### 方法二
上述方法每次使用都需输入，不如封装一个shell。
打开终端:


```markdown
vim ~/.zshrc    //配置全局环境变量

接着在.zshrc中输入


# 终端设置代理
# ----------------------------
# polipo proxy on/off
# ----------------------------
function proxy_on() {
        # 配置http访问
        export http_proxy=socks5://127.0.0.1:1080
        # 配置https访问
        export https_proxy=socks5://127.0.0.1:1080
        # 配置http和https访问
        export all_proxy=socks5://127.0.0.1:1080
        echo '***********   开启终端代理     *************'
}

function proxy_off(){
        # 移除代理
        unset http_proxy
        unset https_proxy
        unset all_proxy
        echo '************   关闭终端代理    **************'
}

//附言:i切换输入文字模式，Esc退出编辑模式，Esc + : wq! 用来保存。
//上述执行完毕后，即可在控制台使用proxy_on开启代理，用proxy_off关闭代理
//下图几个步骤 1.查询本地IP 2.开始终端代理 3.查询代理后的IP 4.关闭终端代理 5.查询本地IP
//开启终端代理，你就可以高速的git clone
```


![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906605549770.jpg)


## 下载别人git仓库及任意分支
```markdown
cd 文件夹     //切换到你要下载的目录
git clone -b 分支名 git仓库http或ssh地址 //下载任意分支 

cd 文件夹     //切换到你要下载的目录
git clone git仓库http或ssh地址      // 默认下载master分支
```






----希望大家尽快学会，有问题可以给我留言。
