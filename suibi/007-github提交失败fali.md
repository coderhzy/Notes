# 解决 SourceTree 提交报错 Failed to connect to 127.0.0.1 port 1081: Connection refused

## 第一步

在终端输入

defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder

这行命令可以显示电脑的隐形文件

## 第二步

在Finder里面个人账号的文件夹里找到gitconfig这个隐藏文件，右击打开，然后把里面的代理proxy整行删掉

## 第三步

回到终端，再次执行pod setup