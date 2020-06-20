# Linux自查手册

## 入门
### 用户
1.切换root用户：su
2.root切换普通用户: su - name
2.创建普通用户：adduser name
3.查看当前登录用户：whoami
4.添加用户:adduser name
5.删除用户:userdel name
6.查看所有用户:cat /etc/passwd

### 用户主目录
linux中cd / cd~ cd cd- 和cd..之间的区别
cd        进入用户主目录
cd ~     进入用户主目录
cd -      返回进入此目录之前所在目录
cd ..     返回上一级目录
cd ../..  返回上两级目录
cd !$    把上个命令的参数作为cd 参数使用
cd /      进入根目录
cd .      当前目录

### 密码
1.修改用户密码：passwd name
2.删除用户密码：passwd -d name
### 日期
1.查询系统当前日期和时间：date
2.设置系统时间：date -s 年-月-日      /         date -s  '年-月-日 时:分:秒'
3.使用man查询date手册:man date
4.日历查询:cal 3 2020
5.同步北京时间：


```markdown
yum install ntpdate
ntpdate -u ntp.api.bz 
```


### 系统
1.重启:reboot
2.关机:shutdown now
3.清屏：clear
4.查看Linux内核版本: 1.cat /proc/version 2.uname -r 3.uname -a

### 文件
1.拷贝
cp     [-f -i -r]    源文件 目标文件
举例子：   
cp /etc/passwd /tmp 
cp -r /etc/passwd  /tmp
cp *.c     /home/shj
2.移动
mv     [-f -i]     源文件 目标文件
mv /etc/passwd /tmp 
mv -r /etc/passwd  /tmp
mv *.c     /home/shj
mv    test.txt    test2.txt
3.rm     [-f -i -r]     文件名或者目录名
rm    /tmp/*
rm    -rf    /tmp/*
4.ls [-l -i -d -a]   [文件名或者目录名]
ls
ls -l
ls -a    /root
ls -dil    /root
5.mk    [-p]     目录名
mkdir    ~/tools
mkdir    -p    zzti/cs/wl15
6.rmdir    [-p]    目录名        **注释:rmdir只可以删除空目录**
rmdir    ~/tools
rmdir    -p    zzti/cs/wl15
7.cd    [路径名]
cd
cd    ~
cd     ..
cd    -
cd    /
cd    /boot/grub
8.file 文件名
file    /bin/ls
file    /etc/passwd
9.
创建空白文件
touch test.htm
10.
查看文件类型
file 1.txt


11.
显示文件内容
cat 1.txt

12
将etc下的以conf结尾的文件复制
cp /etc/*.conf /home/user051A/





### 运行级别
1.0级
关机 halt 
2.1级
single user mode:单用户模式，只支持root账户 
3.2级
不支持网络文件系统多用户模式:Multiuser, without NFS
4.3级
完全多用户模式:Full Multiuser mode
5.4级
系统未使用，用作保留：unused
6.5级
X11:图形界面的多用户模式
7.6级
Reboot:重启

查看当前运行级别：runlevel
查看系统默认运行级别: systemctl get-default
进入其他运行级别：init N（N取值0～6）
设置电脑开机的运行级别:
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906606295474.jpg)

## vim


安装vim
```markdown
yum install -y vim-enhanced
```




### vim文件
1.
vim打开文件前两行:
head -2 filename
vim打开文件后两行:
tail -2 filename


2.
vim文件另存为：
:w filename
### vim工作模式
一般模式(指令模式)，编辑模式，命令行模式


1.
一般模式
```markdown
vim filename   //进入vim一般模式
```


2.
编辑模式
```markdown
//在一般模式按:i I a A o O r R的任意一个
//进入则出现INSERT
//返回一般模式ESC
```


3.
命令行模式：
```markdown
//在一般模式下输入   ：
//进入命令行模式
```


三种模式转换总结
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906606413144.jpg)

### 三种工作模式功能键


一般模式：移动光标，删除，复制，粘贴，查找替换。


#### 移动光标
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906606507071.jpg)


移动多个字符：
n+方向键
将光标向左移动8个字符：8h或8<-
移动光标到某个某列:
9G 5l


#### 删除复制粘贴
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906606610721.jpg)

#### 查找替换
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906606766715.jpg)

#### 从一般模式切换到编辑模式
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906606917183.jpg)



#### 命令行模式
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607014379.jpg)



文件救援文件
.filename.swp


1.vim恢复编辑文件
2.vim代码高亮
3.vim多窗口编辑：
vim -On file1 file2
vim -on file1 file2
-O：垂直分割，不同窗口切换；ctrl+w+<- 或者ctrl+w+->
-o: 水平分割，                   ctrl+w+上键 或者ctrl+w+下键
两个窗口切换：重复安下次ctrl+w
：sp //把同一个文件显示在不同窗口中
：sp filename //在新的窗口中打开另一个文件
：only  //取消分屏
：q    //退出当前所在分屏
4.vim多窗口编辑：
vim file1 file2 file3
:n       //编辑下一个文件
:N        //编辑上一个文件
:files    //列出目前vim开启的所有文
5.vim块选择
v ，V，ctrl+v，y，d，p 
#### 退出vim
6G 1x     //删除第六行第一个字符
:w{name.txt}  //文件另存为
:wq            //保存并退出
:q!             //强制退出
:5G y8G G p //复制5-8行到文档末尾




# 用户


## 三种用户及用户文件
**1.超级用户 2.系统用户 3.普通用户**


1.用户账户文件/etc/password组成
1.用户名：在系统中是唯一的，可由数字字母和符合组成。
2.口令：在字段用“x”代替。将口令保存在/etc/shadow文件中。
3.用户ID：系统用他来标识用户且唯一。
超级用户：UID = 0， GID=0
系统用户：0< UID < 1000
普通用户:UID >= 1000
4.组ID：系统内部用它来标识属性。
5.用户相关信息：例如用户名全名等
6.用户主目录：用户登陆系统后所进入等目录。
root的主目录：/root
普通用户hzy的主目录：/home/hzy　
7.用户登陆环境：用户第一次登陆的shell环境。（默认 bash）


2.用户账户文件：/etc/password存储用户信息
3.用户影子文件：/etc/shadow存储账户相关口令设置
shadow文件只有root才可以访问修改，普通用户不可访问。
shadow文件
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607141247.jpg)




```markdown
查看password文档：cat /etc/passwd
设置口令过期时间：passwd - x 30 username
查看:tail - n1 /etc/shadow
设置账号失效时间：usermod - e 2018-1-1 username
查看:tail - n1 /etc/shadow
删除账户： exit->登出  /etc/passwd
```


## 组和组管理
1.
组是具有相同特性的用户集合。设置的目的主要是便于权限的统一组织和分配。

2.
组管理：系统组和私有组。

3.
组文件构成：
1.组账户文件：/etc/group
2.组影子文件：/etc/gshadow

4.
组管理文件构成：
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607227533.jpg)

5.
组账户管理:1.groupadd 2.groupmod 3.groupdel
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607363151.jpg)


```markdown
groupadd
  创建linux组账户:groupadd linuxgroup
  查看：cat /etc/group
  添加组成员:gpasswd -a username1 linuxgroup
  添加管理员:gpasswd -A username linuxgroup
  查看组影子文件:tail -n1 /etc/gshadow
  //这个时间username这个用户就有来可以添加和删除成员的权限。
  切换到username: su - username
  添加组成员: gpasswd -a tcpdump linuxgroup 
  删除组账户: gpaddwd -d username1 linuxgroup
  退出:exit
  
  将文件设置某个组所有
  /home/user051A目录下的所有文件改为user051A所有，属于group051A组。
  chown -R user051A:group051A /home/user051A
```


```markdown
  1.给linuxgroup组指定新的ID：groupmod -g 1005 linuxgroup
  2.查看: tail -n1 /etc/group
  3.给组改名:groupmod -n 新名字 源名字
  4.删除组: groupdel linuxgp
  5:查看组管理文件:cat /etc/group
```




## 结束进程
Kill -9 进程号




# 图形界面管理
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607493769.jpg)

## Gnome
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607555425.jpg)


# 进程
程序（program）：通常位binary program存放在计算机的硬盘、光盘、U盘等存储媒体中，以实体文件的形态存在。
进程（proces）：运行中的程序。操作系统给予这个程序在的内存内的单元一个标识符（process ID，简称PID）。
程序与进程的区别：程序是指令的集合，是进程运行的静态描述文本。进程则是程序在系统上顺序执行时的动态活动。




## 进程的分类
1.交互进程（shell） 2.批处理进程（进程序列） 3.守护进程（特殊的后台进程）


## 进程的属性
1.进程号（PID）2.父进程号（PPID） 3.进程名 4.CPU% 5.内存% 6.优先级 7.开启时间等


启动前台进程：用户在shell输入一条命令，就可以启动一个前台进程。例如：Vim /pro/cpuinfo
启动后台进程：只需要在命令后面加一个字符&。  例如：find / -name root>result.txt &


jobs[-l]:查看当前shell中已经启动的后台进程的执行状态。
fg %n（n代表后台进程的工作号）


## 查看进程状态的命令
1.uptime 2.ps（检测后台进程）常用ps -ef 或 ps -aux 3.top 用top -bn1 一次性把全部信息输出出来（静态）


## 终止进程
前台进程：1.退出执行 2.ctrl+c
后台进程：kill -15  pid   //正常结束一个进程
  kill -9 pid    //强制终止一个进程




# 软件包管理
常用两种：RPM和YUM
通过yum下载RMP包：yum install yum-utils
## RPM："REDhat Package Manger"
将程序源代码经过编译和封装以后形成的包文件。
RPM格式：name-version-release.arch.rpm
1.安装RPM包：网上下载一个RPM包，然后运行命令。 rpm -ivh 文件名
2.升级 RPM包：rpm -Uvh 文件名
3.查询一个包是否安装：rpm -q rpm包名。
4.查看当前系统所有安装过的RPM包：rpm -qa
5.写在RPM包：rpm -e 文件名
6.得到一个安装rpm包的相关信息：rpm -qi
7.列出一个rpm包安装的文件：rom -ql 包名
8.列出某一个文件属于哪个rpm包：rpm -qf 文件的绝对路径
9.统计系统中已经安装的软件包的个数： rpm -qa |wc -l
10.卸载一个包：rpm -e 软件包名字+版本号（输入查询出的软件包名字+版本号）


## YUM："Yellow dog Updater Modified"
yum的宗旨是自动升级，安装/移除RPM包
常用
1.列出所有可能的rpm包。 yum list                    //可以利用grep来过滤,yum list |grep[关键字]
2.搜索一个rpm包。  yum serch [关键词]
3.安装一个RPM包： yum install [-y][rpm包名]
4.卸载一个RPM包： yum remove [-y][rpm包名]
5.升级一个RPM包： yum update[-y][rpm包名]
# 网络管理
通过主机名可以实现局域网内的访问
配置主机名：hostname
1.查看主机名：hostname
2.设置主机名:hostname 计算机新名字 //临时生效
3.在文件中修改主机名 //永久生效   :    vi /etc/hostname


## 使用ifconfig配置网络接口（网卡）
1.查看所有网卡信息  ifconfig
2.查看指定网卡(比如eth0)的情况: ifconfig eth0
3.设置ip地址:ifconfig    网卡名 ip地址 netmask 子网掩码
例如：设置第一块网卡(eth0)的ip地址为192.168.1.3 子网掩码为255.255.255.128
ifconfig eth0 192.168.1.3 netmask 255.255.255.128
4.对网卡的禁用和启动,可以使用ifconfig命令
ifconfig 网卡名称 down //禁用网卡
ifconfig 网卡名称 up    //启用网卡


### 1.测试网络状况ping
命令格式:ping [可选项]     IP地址或主机
ping命令选项：
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607674852.jpg)


### 2.netstat命令
命令格式：   netset [可选项]
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607754488.jpg)



### 3.nslookup测试域名解析
安装nslookup命令：yum provides */nslookup
   yum -y install bind-utils
1.非交互式：nslookup 域名或ip地址
2.交互式：nslookup


# linux文件类型
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607848232.jpg)

## find命令
使用find命令查找指定类型的文件： find / -type [f d b c s p l] [-ls][wc-l]
显示某类型所有文件：find /dev -type d -ls
查看某类型数量：find /dev -type s -ls | wc -l

f: 普通文件
l: 符号链接文件
s：套接字文件
b: 块设备文件
c: 字符设备文件
p: 管道文件

空文件或目录
-empty
find /app -type d -empty


## 权限问题
### 第一种
rwx：所有者权限，可读性可写可执行
rw：同组用户权限，可读 可写 不可执行
r-w：其他用户的权限，可读 不可写 可执行


### 第二种
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906607934802.jpg)


查看文件权限：ls -l   //文件所有者 文件组 其他人 三种


使用chown
改变文件所有权： 1.  chown改变文件所有  chown username:groupName fileName
2.改变文件组
改变文件夹所有权： 
第一步： ls -aF
第二步： chown -R username:groupName folderName
第三步:   ls -l folder
使用chgrp
改变文件的组：chgrp groupName fileName
改变文件夹组: chgrp -R groupName folserName
## 更改权限
1.
给文件更加权限
chmod 777 fileName
2.
给整个文件路径加权限
chmod -R 777 fileName      这个-R代表递归


rwx权限数字解释
chmod也可以用数字来表示权限如 chmod 777 file
语法为：chmod abc file
其中a,b,c各为一个数字，分别表示User、Group、及Other的权限。
r=4，w=2，x=1
若要rwx属性则4+2+1=7；
若要rw-属性则4+2=6；
若要r-x属性则4+1=7。

## 给文件加权限
修改文件权限：chmod u+x fileName   //u代表user
修改组对文件权限：chmod g=rwx fileName     //这里的g代表组
修改其他用户对这个文件权限：chmod o+w fileName  //o代表other 
修改所有人对这个文件权限： chmod a=r fileName   //这里的a是all
将用户的权限赋值给其他人：chmod o=u fileName  //将user的权限赋值给other




## 文件归档和压缩
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906608041005.jpg)

# 1. 压缩文件
gzip 源文件
如压缩 b.txt 使用命令 gzip b.txt 注意 压缩为 .gz 文件 源文件会消失
如果想保留源文件 使用命令 gzip -c 源文件 > 压缩文件
# 2. 压缩目录
gzip -r 目录
注意 gzip 压缩目录 只会递归地压缩目录下的所有文件 不会压缩目录
# 3. 解压
gzip -d xxx.gz
1.
打包某个文件到某个地方
tar -cvf  fileName.tar /home
2.
直接查看tar文件的内容
tar -tvf fileName.tar
3.
直接抽取tar文件的内容
tar xvf filName.tar


## 压缩 
1.bzip2 fileName.后缀名
2.查看是否压缩成功: bzip -tv fileName.后缀名.bz2
3.解压缩: bunzip2 1


## 先归档再压缩
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906608297040.jpg)

1.tar命令
格式：tar <选项> 备份后的文件名 源文件或目录     //为文件和目录做备份，归档为tar文件，如果设置选项还可以进程文件的压缩


## 打包和解包
例子：
打包：tar -cvf hello.tar hello/                                //打包某个文件夹内的所有文件
解包：tar -xvf hello.tar hello/                                //解包
打包若干个文件: tar -cvwf hello.tar hello/                //比之前多了个w，需要打包的按y
解包： tar -xvwf hello.tar hello/                             //解包

## 软硬链接文件
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906608452163.jpg)


软链接就是个指针
硬链接相当于文件的备份，复制，但他们是连动的，一个改变，所有的都改变
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/05/28/15906608598107.jpg)



# 查看系统中所有文件
find / -name "vsftpd"
find / -name "named"
find / -name "httpd"


 # 使用yum下载RPM包
yum -y install --downloadonly <packageName>
#下载完后的包缓存在下面的目录中
/var/cache/yum/x86_64/6/base/packages


# 如果要保存到指定的目录中，需要指定参数--downloaddir
yum install --downloadonly --downloaddir=/tmp <package-name> 








磁盘分区
查询磁盘ls /dev | grep sd
分区fdisk /dev/sda
### IDE插槽
第一个IDE插槽中的第1块物理IDE硬盘hda，第一个IDE插槽中的第2块物理IDE硬盘hdb；第二个IDE插槽中的第1块物理IDE硬盘hdc，第二个IDE插槽中的第2块物理IDE硬盘hdd；

# Shell脚本

**1.vim fist.sh**

![image-20200526084356329](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/20200526084359.png)

**2.shell执行**

​    （1）./first.sh

​	  (2)  sh first.sh

​	  (3) sh -x first.sh     => 跟踪状态



![image-20200526085641491](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/20200526085759.png)

![image-20200526085823917](https://cdn.jsdelivr.net/gh/hzy1257664828/Images/img/20200526085824.png)

# linux的shell脚本
Shell是一个命令解释器，它的作用是解释执行用户输入的命令及程序等。 用户每输入一条命令，Shell就执行一条。这种从键盘输入命令，就可以立即得到回应的对话方式，称为交互的方式。
![](https://hzy-1301560453.cos.ap-shanghai.myqcloud.com/2020/06/09/15916689025492.jpg)


当命令或程序语句不在命令行下执行，而是通过一个程序文件来执行时，该程序文件就被称为Shell脚本。 在Shell脚本里内置了很多命令、语句及循环控制，然后将这些命令一次性执行完毕，这种通过文件执行脚本的方式称为非交互的方式。 Shell脚本语言很适合用于处理纯文本型的数据，而Linux系统中几乎所有的配置文件、日志文件，以及绝大对数的启动文件都是纯文本类型的文件。
Shell 脚本的类型
Shell脚本语言是弱类型语言（无须定义变量的类型即可使用），在Unix/Linux中主要有两大类shell: 
一类是 Bourne  shell ,另一类是 C shell

- Bourne shell 包括 Bourne shell (sh)、Korn shell(ksh)、Bourne Again Shell 三种类型。 
C shell包括csh、tcsh两种类型
- 查看系统默认的shell： echo  $SHELL
- 查看系统支持的shell： cat  /etc/shells

## Shell脚本的执行
sh shell.sh(shellName)

## 一些脚本编写的运算符
```
for
do
     内容
done
```

```
if 条件内容     
       then         
            内容 
fi
```

## Shell中常用的算术运算符

- +：对两个变量做加法。

-  -：对两个变量做减法。

- *：对两个变量做乘法。

- /：对两个变量做除法。

- **：对两个变量做幂运算。

- %：取模运算，第一个变量除以第二个变量求余数。

- +=：加等于，在自身基础上加第二个变量。

- -=：减等于，在第一个变量的基础上减去第二个变量。

- *=：乘等于，在第一个变量的基础上乘以第二个变量。

- /=：除等于，在第一个变量的基础上除以第二个变量。

- %=：取模赋值，第一个变量对第二个变量取模运算，再赋值给第一个变量。


## 数学运算
- t=`expr$1**$2`                        #用expr改变运算顺序，求x的y次方。

- t=$[t*3]                               #t乘以3。

- s=$[s+t]                               #结果相加。

- t=$[$1**2]                             #求x的平方。

- t=$[t*4]                               #结果乘以4。

- s=$[s+t]                               #结果相加。

- t=`expr$2*5`                          #求5y的值。

- s=$[s+t]                               #结果相加。

- s=$[s+6]                               #结果加上6。

- echo$s                                #输出结果。

- echo$((a%b))                          #取余



# Linux服务器
## ContOS端安装
openssh-clients 通过yum安装执行 yum install openssh-clients Mac端使用scp指令上传文件 打开终端，进入你要上传的文件目录下，使用scp指令上传文件
## Centos7解压Zip文件
一、安装支持ZIP的工具
yum install -y unzip zip
二、解压zip文件
unzip 文件名.zip
三、压缩一个zip文件
 
zip 文件名.zip 文件夹名称或文件名称
## Mac终端在服务器重装系统之后连接不上
```
vi /Users/wangdong/.ssh/known_hosts
```