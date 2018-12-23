---
layout: post
title: SpringCloud搭建
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.介绍

服务注册中心:demo-eureka

应用服务器1:demo-service1

应用服务器2:demo-service2

路由网关服务:demo-zuul

注意:

1.应用服务器的spring.application.name配置相同

2.应用服务器spring.cloud.config.discovery.serviceId=服务注册中心的spring.application.name

3.SpringBoot版本2.1.1, SpringCloud版本Finchley.M8(版本不一样会报proxyRequestHelper错误)

**更新列表：**

*



**参考文章：**

* [基于SpringBoot 2.0正式版的SpringCloud的微服务实战项目搭建][1]
* [Spring Cloud 启动错误 - java.lang.NoSuchMethodError][2]
* [解决The bean 'proxyRequestHelper', defined in class path resource [org/springframework/cloud/报错][3]


[1]: https://blog.csdn.net/guokezhongdeyuzhou/article/details/79653159
[2]: https://www.jianshu.com/p/794fe4761b1f
[3]: https://blog.csdn.net/qq_39621518/article/details/84984040