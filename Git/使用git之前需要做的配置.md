``` JS
git config --global user.name'your_name'
git config --global user.email'your_email@domain.com'
```

**config**
``` JS
git config --local   // 针对某个仓库有效
git config --global // global 对当前用户所有仓库有效
git config --system // system 对系统所有登录的用户有效
```

**显示config的配置，加--list**
``` JS
git config --list --local
git config --list --global
git config --list --system
```

