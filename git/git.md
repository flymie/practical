## 常规使用
***

> 查看所有配置以及所在的文件   
```
git config --list --show-origin 
```
> 用户信息  

```
git config --global user.name wuxiang
git config --global user.email some@.some
```
使用了 --global 选项，那么该命令只需要运行一次，之后都会使用这些信息，不同项目使用不同邮箱，在该项目下运行没有 `--global` 的命令。
  
> 检查git的某一项配置 `git config <key>`，例如：
```
git config user.name
```
> 获取帮助
```
git help <verb>
git <verb> --help
```
如果你不需要全面的手册，只需要可用选项的快速参考，那么可以用 `-h`，例如 `git config -h`

> 克隆已有项目
```
git clone <url>
git clone <url> <name>  // 修改克隆到本地的仓库名
```

> 检查当前文件状态  
```
git status
// 简洁的方式查看
git status -s
git status --short
```

> 跟踪新文件
```
git add <files>
git add .
```
将这 个命令理解为“精确地将内容添加到下一次提交中”

> 提交更新
```
git commit -m 'message'
```

> 查看提交历史  

    git log

> 自定义git log

    git config --global alias.glog "log --pretty=format:'%h %an %ad %s'"
    git config --global --unset alias.glog




[git使用手册](https://git-scm.com/book/zh/v2)  
搞砸误删了会用到的：  
`git log`  
`git reflog`  
`git reset --hard {...}`  
`git branch {branchName} {...}`  
`git cherry-pick {...}`

如果想要检查你的配置，可以使用 `git config --list` 命令来列出所有 Git 当时能找到的配置。  
你可以通过输入 `git config <key>`： 来检查 Git 的某一项配置,如：  
<pre>$ git config user.name</pre>
`git status`查看信息，参数另查  
`git commit --amend`如果`commit`的时候信息写错了，如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。

## 从当前分支新建一个新的仓库
1、将仓库repo_b的URL添加到工作仓库到remote。  
`git remote add origin_repo_b git@server_ip:/path/repo_b.git`  
（origin_repo_b:自己起到名字，不要和现有的remote重名）  
（git@server_ip:/path/repo_b.git：repo_b的远程路径）  
2、将代码推送到远程repo_b。  
`gti push origin_repo_b branch_a`  
（origin_repo_b：远程仓库repo_b的名字）  
（branch_a：仓库repo_a的branch_a分支）  
3、克隆仓库repo_b，检查是否成功  
`git clone git@server_ip:/path/repo_b.git`  

