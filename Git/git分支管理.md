## 查看所有分支
git branch -a
## 查看远程分支
git branch -v
## 查看本地分支所连接的远程分支
git branch -vv

## 修改本地分支名称
git branch -m old_name new_branch

## 删除远程分支
git push origin :old_master

## 将新分支推送到远程仓库
git push -u origin new_branch