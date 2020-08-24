``` JS
cd .git
cat HEAD // 指的是引用，正在工作的分支

config // user.name  && user.email

refs // heads -> 分支 ， tags -> 里程碑
refs -> heads // heads里面装着分支的哈希值, cat master,
git cat-file -t 哈希值 // 查看分支的哈希值是什么类型
object //存放着内容
```
