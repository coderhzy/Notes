Head 指向 分支，当我们切换分支的时候，Head会随着分支而改变。
不过Head指向的底层是commit。


``` JS
git diff commit1 commit2 // 可以查看分支比对
git diff HEAD HEAD~1 // 指HEAD和HEAD的父级
```
