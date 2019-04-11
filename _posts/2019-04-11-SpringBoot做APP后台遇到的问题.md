---
layout: post
title: SpringBoot做APP后台遇到的问题
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

后端java代码修改,引用的DevTools导致SpringBoot进行reload了,然后就导致需要重新登录,因为热部署导致CacheManager失效了

考虑到数据安全性,可以使用前后的加密解密的方式解决



**更新列表：**



**参考文章：**

* [Spring boot热部署导致CacheManager重名的解决办法][1]
* [Spring Boot Http通信数据之加解密][2]
* [SpingBoot加解密项目spring-boot-starter-encrypt操作][3]
* [SpringBoot前后端数据传输加密][4]


[1]: https://blog.csdn.net/Amo_lt/article/details/78476452
[2]: https://blog.csdn.net/huang812561/article/details/79424041
[3]: https://blog.csdn.net/fishinhouse/article/details/80566138
[4]: https://blog.csdn.net/junmoxi/article/details/80917234