---
layout: post
title: eclipse安装svn
categories: svn
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

有时候eclipse安装svn失败，有可能是版本不兼容造成的，而版本不兼容只能找相应的版本进行安装

从http://subclipse.tigris.org/servlets/ProjectProcess?pageID=p4wYuA找到相应的离线包下载进行安装

在网站上可以看到有3个大版本：Eclipse 2.1.3、Eclipse 3.0/3.1、Eclipse 3.2+

找到相应的Zipped downloads点击进去

比如我的是Indigo，3.2以上的，我点击Links for 1.6.x Release下的Zipped downloads进去下载，我下载一个site-1.10.11.zip，然后复制到eclipse\dropins目录下，直接解压为site-1.10.11，然后重启eclipse就可以了，直接绿色安装

**更新列表：**

*



**参考文章：**

* [subclipse Download and Install][1]


[1]: http://subclipse.tigris.org/servlets/ProjectProcess?pageID=p4wYuA
