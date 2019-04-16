---
layout: post
title: SpringBoot不显示fontawesome图标
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


使用SpringBoot开发的web项目,在有静态资源的时候,跳转到src-main-resources目录下的静态文件,

当这些文件的路径使用绝对路径时,就没有办法使用项目发布到tomcat,需要发布到ROOT项目下,

但是在eclipse使用的内置tomcat运行正常,是因为SpringBoot配置默认访问路径，默认为/,相当于ROOT下,一个tomcat占用一个端口



**更新列表：**



**参考文章：**

* [fontawesome图标 springboot + chrome无法正常显示][1]
* [Spring Boot項目中的字體文件問題][2]
* [][3]

[1]: https://www.zhihu.com/question/273588923
[2]: https://www.itread01.com/content/1534167530.html
[3]: 