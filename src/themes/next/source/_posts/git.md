---
title: git
date: 2017-05-05 16:41:18
tags: git
categories: 笔记
---

### git配置

####  生成一对公钥和私钥

```sh
ssh-keygen -t rsa -C 'userName@mail.com'		# -t ：指定加密方式	-C 备注

Enter file in which to save the key (/c/Users/Elicc/.ssh/id_rsa):	# 指定生成的私钥路径，不指定则按在默认位置生成
```

####  检测是否可成功连接git服务端

```sh
ssh -vt git@github.com		
# vt 测试与服务端连接状态并启用调试  -v 启用调试 -t 使客户端采用交互模式
# 其他ssh命令参数 -i 指定密钥路径   -p 指定ssh端口  -l 指定登录用户   -F 指定客户端配置文件（默认客户端配置文件为 ssh.config）
```

####  同时管理多个ssh密钥配置
git默认会使用 "id_rsa" 密钥进行连接，当需要与多个服务端连接时，需配置不同的主机对应的密钥文件。
操作步骤：

- 第一步：在 .ssh 目录下创建 config 文件

```sh
touch ~/.ssh/config
```

- 第二步：设置文件可读写

``` sh
chmod 600 ~/.ssh/config
```

- 第三步：文件中写入主机与对应的密钥文件

```sh
Host github.com
    Port 22
    User git
    IdentityFile ~/.ssh/github

 Host git.oschina.net
    Port 22
    User git
    IdentityFile ~/.ssh/oschina
```

- 内容说明：
    - Host：主机域名或ip地址
    - User：连接主机时的 @ 符号前的用户名
    - IdentityFile：密钥文件

### ssh服务端配置

- 在 `` ~ `` 目录下创建 `` .ssh `` 目录，并设置目录权限为700

```sh
    cd ~
    touch .ssh
    chmod 700 .ssh
```

- 创建服务端授权文件 authorized_keys，并设置文件权限为600（必须），并将公钥写入文件

``` sh
    touch authorized_keys
    chmod 600 authorized_keys
    cat ~/.ssh/elicc.pub >> authorized_keys
```

### git常用命令

##### git clone

```sh
    git clone git@git.oschina.net:elicc/git_usage.git  /c/git/git_usage
    git clone https://git.oschina.net/elicc/git_usage.git  /c/git/git_usage
```

- 路径省略，直接克隆到当前目录下  

##### git remote    
>    git每个远程主机都有一个主机名，
>    使用 `` git remote `` 列出所有远程主机，
>    `` git remote -v ``查看主机地址。``   在克隆时，自动将代码所在主机命名为 `` origin `` 主机名。
>    `` git remote rm <主机名> `` 删除主机
>    `` git remote rename <主机名> `` 重命名主机
>    `` git remote rm origin `` 删除origin主机     `` git remote add origin [url] `` 添加新的origin主机  

##### git init  
>  在本地初始化一个git仓储目录，然后使用命令``git remote -v``查看当前项目远程仓库，刚创建的项目为空.
>  使用``git remote add origin git://elicc.top/rep/demo.git``添加远程仓库，然后使用``git add. && git commit -am 'init' && git push origin master``提交代码。

##### git branch
>   `` git branch `` 查看本地分支，当前分支名前有 * 标识。 以 `` 主机名/分支名 `` 方式显示
>   `` git branch -r `` 查看远程分支
>   `` git branch -a `` 查看所有分支，本地分支白色标识，远程分支红色标识
>   `` git branch <新分支名> `` 创建新分支
>   `` git branch -d <分支名> `` 删除分支
>   `` git branch -m <原分支名> <新分支名> `` 重命名分支

##### git checkout
>   `` git checkout <分支> `` 切换分支
>   `` git checkout -b [分支] `` 创建一个分支，并切换到该分支
>   `` git checkout . `` 撤销暂存区文件到工作区
>   `` git checkout [file] `` 撤销暂存区的指定文件到工作区

##### git pull
>   `` git pull <主机名> <远程分支>:<本地分支> `` 获取指定主机的远程分支，与本地分支进行合并，若与当前所在分支合并，则 : 后本地分支名可省略

##### git push
>   `` git push <主机名> <本地分支>:<远程分支> `` 将本地分支提交到主机的远程分支，远程分支不存在时，自动创建一个新的分支
>   `` git push <主机名> :<远程分支> `` 将本地空分支提交到远程分支，用于删除掉远程分支
>   `` git push <主机名> <远程分支> `` 若远程分支不存在，会创建一个新的远程分支

##### git add  
>   `` git add . `` 提交当前目录下所有更改到本地索引库
>   `` git add <file1> <file2>... `` 提交指定文件到本地索引库

##### git commit
>   `` git commit -m "提交描述" `` 提交到本地，使用前需先保存修改
>   `` git commit -a -m "提交描述" `` 或  `` git commit -am "提交描述" `` 提交工作区自上次commit之后的变化，直接到仓库区，不需先使用 `` git add `` 命令
>   `` git commit -v `` 提交时显示所有更改信息

##### git reset
>   `` git reset --hard <commit_id> `` 恢复到指定的提交ID对应的版本
>   `` git reset commit <commit_id> <filename> `` 恢复指定文件到对应的提交ID版本

##### git stash
>   ``git stash`` 保存工作区未提交的更改，此时可``git checkout``切换到其他分支
>   ``git stash apply / pop`` 当从其他分支，切换回原分支后，可通过此命令恢复之前``git stash``保存的代码
>   ``git stash list `` 获取所有当前保存的所有进度列表

##### git fetch
>   ``git fetch -p `` 或 `` git remote prune origin `` 删除远程分支在本地的缓存（远程分支已删除，本地未同步情况下使用）

##### git status
>   查看当前版本库状态

##### git log
>   `` git log `` 查看当前分支所有版本历史
>   `` git log -5 `` 查看当前分支最近 5 个版本历史
>   `` git log --stat `` 查看当前分支所有版本历史，包含文件信息

##### git reset / git checkout . / git revert 区别
>  `` git reset `` 回退提交，将一个分支的末端指向另一个提交
> 参数：
> --soft – 缓存区和工作目录都不会被改变
> --mixed – 默认选项。缓存区和你指定的提交同步，但工作目录不受影响
> --hard – 缓存区和工作目录都同步到你指定的提交
> eg. ``git reset --hard HEAD~2`` 回退上两次提交，并同时更新缓存区和工作目录修改

![reset](/images/reset.svg)

>  `` git checkout `` -  将``HEAD``移动到一个新的分支或提交上，会覆盖当前本地修改
> git checkout file-name 撤销某个文件   git checkout . 撤销所有更改

![checkout](/images/checkout.svg)

> git checkout HEAD~2 - checkout到当前提交的祖父提交

![checkout](/images/checkout_1.svg)

#####  `` git revert `` - Revert撤销一个提交的同时会创建一个新的提交
> git revert HEAD~2 找出倒数第二个提交，然后创建一个新的提交来撤销这些更改，然后把这个提交加入项目中。

![revert](/images/revert.svg)

> 相比git reset，它不会改变现在的提交历史。因此，git revert可以用在公共分支上，git reset应该用在私有分支上。
> 你也可以把git revert当作撤销已经提交的更改，而git reset HEAD用来撤销没有提交的更改。
> 就像git checkout 一样，git revert 也有可能会重写文件。所以，Git会在你执行revert之前要求你提交或者缓存你工作目录中的更改。


| 命令	| 作用域	| 常用情景 |
| ---------:| ----:|---|
| git  reset	| 提交层面	| 在私有分支上舍弃一些没有提交的更改 |
| git reset	| 文件层面	| 将文件从缓存区中移除 |
| git checkout	| 提交层面	| 切换分支或查看旧版本 |
| git checkout	| 文件层面	| 舍弃工作目录中的更改 |
| git revert	| 提交层面	| 在公共分支上回滚更改 |
| git revert	| 文件层面	|（ 然而并没有）|

 [相关链接](http://www.cnblogs.com/itech/p/5188933.html)
