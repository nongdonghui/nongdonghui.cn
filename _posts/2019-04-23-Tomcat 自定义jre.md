---
layout: post
title: Tomcat 自定义jre
categories: Tomcat
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1. windows

     将jre目录放到tomcat根目录下，然后在文件./bin/catalina.bat 中找到    set CLASSPATH=    一行，在前面加

     set "JRE_HOME=%CATALINA_BASE%\jre"


2. linux

     将jre目录放到tomcat根目录下，然后在文件./bin/setclasspath.sh 中, 在第一个非注释行前面加

     export JRE_HOME="${CATALINA_HOME}/jre"


**更新列表：**

*



**参考文章：**

* [Tomcat 自定义jre][1]



[1]: https://blog.csdn.net/lilongjiu/article/details/53431805

