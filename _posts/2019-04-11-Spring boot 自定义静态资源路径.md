---
layout: post
title: Spring boot 自定义静态资源路径
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

* [Spring boot 自定义静态资源路径][1]
* [SpringBoot遇到的问题--无法请求html等静态资源文件][2]
* [Spring Boot：内置tomcat启动和外部tomcat部署总结][3]

[1]: https://blog.csdn.net/qq_37009083/article/details/81624373
[2]: https://blog.csdn.net/cmqwan/article/details/83934249
[3]: https://blog.csdn.net/lmdsoft/article/details/82863795