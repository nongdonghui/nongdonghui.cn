---
layout: post
title: eclipse附加默认junit的源码
categories: eclipse
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

在使用eclipse写测试用例的时候，使用系统内置的junit，然后在构建路径里面编辑不了源码，经过搜索和尝试，发现只需要到<ftp://ftp.osuosl.org/pub/eclipse/eclipse/updates>下载相应版本的源码，然后放到eclipse/plugins路径下重启eclipse即可。这里以4.6.0的eclipse为例，访问<ftp://ftp.osuosl.org/pub/eclipse/eclipse/updates/4.6/R-4.6-201606061100/plugins/>网站，查找org.junit，然后org.junit.source_4.12.0.v201504281640.jar就是我们要找的源码文件，下载下来放到eclipse/plugins路径下重启eclipse即可。

**更新列表：**

*



**参考文章：**

* [How do I configure JUnit's Source in Eclipse?][1]


[1]: http://stackoverflow.com/questions/1084176/how-do-i-configure-junits-source-in-eclipse/38155957#38155957
