---
layout: post
title: 在Centos中yum和rpm安装和卸载软件的使用方法
categories: centos
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
1.yum安装软件包

```
yum -y install httpd
```

* 其中-y是自动输入y(当有y/n选择时)

2.yum卸载软件包

```
yum -y remove httpd
```

3.rpm安装软件包

```
rpm -i httpd.rpm 安装 httpd.rpm 包；
rpm -iv httpd.rpm 安装 httpd.rpm 包并在安装过程中显示正在安装的文件信息；
rpm -ivh httpd.rpm 安装 httpd.rpm 包并在安装过程中显示正在安装的文件信息及安装进度
```

4.rpm卸载软件包

```
rpm -e httpd
```

5.rpm升级软件包

```
rpm -Uvh httpd.rpm
```

6.rpm查询软件包

```
rpm -q httpd
```

* 其中httpd.rpm需要下载,可以在[这里][3]查找rpm包进行下载

7.rpm还可以下载httpd.src.rpm然后自己编译

**更新列表：**

*



**参考文章：**

* [在Centos中yum安装和卸载软件的使用方法][1]
* [RPM安装命令总结][2]
* [rpm包资源地址][3]
* [rpm 命令|rpm 安装|rpm 卸载|rpm 使用|rpm 删除][4]

[1]: http://gzmaster.blog.51cto.com/299556/72278
[2]: http://www.cnblogs.com/zqwang0929/p/3352237.html
[3]: http://rpmfind.net/
[4]: http://www.jb51.net/LINUXjishu/10984.html