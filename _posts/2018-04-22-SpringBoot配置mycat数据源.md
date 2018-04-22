---
layout: post
title: SpringBoot配置mycat数据源
categories: git
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

application.yml

```
spring:
  application:
    name: mycat-jpa
  datasource:
    platform: mysql
    type: com.zaxxer.hikari.HikariDataSource
    driver-class-name: com.mysql.jdbc.Driver
    url: jdbc:mysql://localhost:8066/mall?useUnicode=true&characterEncoding=utf-8&autoReconnect=true&failOverReadOnly=false&useSSL=false
    username: root
    password: jiabin
  jpa:
    hibernate:
      ddl-auto: none
    show-sql: true
```

**更新列表：**

*



**参考文章：**

* [SpringBoot配置mycat数据源][1]
* [][2]


[1]: https://github.com/TheNowWJJ/mycat/blob/master/src/main/resources/application.yml
[2]: 
