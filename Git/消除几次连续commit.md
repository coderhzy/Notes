**消除几次连续commit**
``` JS
git log // 查询哈希值
git reset --hard 哈希值 // 在哈希值之前的commit都会消失，可以理解为将head指针指向这个哈希值对应的commmit
```
