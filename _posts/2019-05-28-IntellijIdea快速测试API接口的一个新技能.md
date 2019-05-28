---
layout: post
title: IntellijIdea快速测试API接口的一个新技能
categories: IntellijIdea
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.登录login.http

```
POST {{url}}/login?username=admin&password=111111&deviceId=1
Accept : application/json
Content-Type : application/json;charset=UTF-8
Authorization: Basic client secret
Cache-Control : no-cache

###
```

2.首页index.http

```
POST {{url}}/index?token={{token}}
Accept : application/json
Content-Type : application/json;charset=UTF-8
Authorization: Basic client secret
Cache-Control : no-cache

###
```

3.配置文件rest-client.env.json

```
{
  "development" : {
    "url" : "http://localhost:8088/test/rest",
    "token" : "5be4fd6849248e07047dd2f8b8489e62"
  },
  "test" : {
    "url" : "http://localhost:8089/test/rest",
    "token" : "5be4fd6849248e07047dd2f8b8489e62"
  },
  "preproduction" : {
    "url" : "http://192.168.0.180:8090/test/rest",
    "token" : "5be4fd6849248e07047dd2f8b8489e62"
  },
  "product" : {
    "url" : "http://192.168.0.181:8090/test/rest",
    "token" : "5be4fd6849248e07047dd2f8b8489e62"
  }
}
```

login.http登录运行之后，将token替换配置文件内的token值，再运行index.http


**更新列表：**



**参考文章：**

* [关于快速测试API接口的一个新技能][1]
* [][2]
* [][3]
* [][4]
* [][5]
* [][6]

[1]: https://www.jb51.net/article/141856.htm
[2]: 
[3]: 
[4]: 
[5]: 
[6]: 