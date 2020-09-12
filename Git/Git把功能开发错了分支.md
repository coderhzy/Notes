## 场景一:改完代码忘记切换分支，代码改了很多怎么办?
``` JS
git add . // 把所有改动暂存
git stash // 将暂存的文件提交到git暂存栈
git checkout 需要提交的分支
git stash pop // 将暂存栈中的代码pop出来
```
## 场景二: 代码不但改了，还提交了怎么办？
``` JS
git checkout 不该提交代码提交了代码的分支
git reset HEAD~1 // (撤销commit，暂存区东西恢复)
git stash // 把暂存的文件提交到git的暂存栈
git checkout 你需要提交代码的分支
git shash pop // 从暂存栈放出代码。
```
