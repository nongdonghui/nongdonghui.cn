---
layout: post
title: GitServer搭建
categories: git
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 银川 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

用过在本地连接github，想自己搭建一下git服务器，在网上找了一下，发现scm-manager口碑不错，所以下载来试试

### 1.scm-manager下载地址：https://www.scm-manager.org/download/  
* 下载scm-webapp-1.54.war，解压到tomcat的ROOT中，启动  
* 使用用户名/密码： scmadmin/scmadmin登录

### 2.修改Repository Types为D:\scm-manager\repositories

### 3.打开Archive功能：  
Config -> General -> General Settings -> 勾选Enable repository archive。

### 4.新建用户(Users)，01和02，数据存放在
C:\Users\01\.scm\config\config.xml

### 5.新建Repositories：test

### 6.检出	
git clone http://scmadmin@192.168.43.186:8080/git/test
注：scmadmin是用户名，根据实际情况修改为自己的用户名

### 7.提交
git clone http://01@192.168.43.186:8080/git/test

遇到的问题：

* 1.我在一个eclipse里面可以，没问题，有启动了一个eclipse，检出报异常：  
Transport Error Please check: 
Network Connection settings 
Network Connection -> SSH2 Eclipse preferences  
试过Window→Preferences→Team→Git→Configuration→New Entry→http.sslverify=false  
未解决

* 2.在检出的项目中，新建了一个new.txt文件，使用命令行添加：git add new.txt，然后键入git commit回车，就进入编辑模式，无法退出  
最后参考这里，按esc然后输入:wq（包含冒号），可以退出

**参考文章：**

* [自己动手搭建Git服务器-SCM-Manager][1]
* [Windows下配置Git服务器和客户端][2]
* [Git 提交代码][3]
* [Ubuntu git提交出现这个界面怎么退出][4]


[1]: http://www.voidcn.com/blog/zhongguomao/article/p-6338986.html
[2]: https://my.oschina.net/bygreencn/blog/314056
[3]: https://coding.net/help/doc/git/push.html
[4]: https://segmentfault.com/q/1010000002490510