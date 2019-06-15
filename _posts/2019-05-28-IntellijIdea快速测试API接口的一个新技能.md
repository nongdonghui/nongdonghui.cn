---
layout: post
title: IntellijIdea快速测试API接口的一个新技能
categories: IntellijIdea
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

第一种方法 : 使用 editor rest client

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

以下是把登录后的token保存，然后发首页请求的时候直接使用保存的token作为参数



```
all.http

### 系统登录
POST {{url}}/login?username=bgs01&password=111111&deviceId=1
Accept : application/json
Content-Type : application/json;charset=UTF-8

> {% client.global.set("auth_token", response.body.obj) %}

### 首页加载
POST {{url}}/index?token={{auth_token}}
Accept : application/json
Content-Type : application/json;charset=UTF-8
```

然后先登录，再请求首页即可

第二种方法 : 使用图形界面

选择tools--->http client --> test restful web service,出现如下界面,填写示例请求参数

**更新列表：**



**参考文章：**

* [关于快速测试API接口的一个新技能][1]
* [HTTP client in IntelliJ IDEA code editor][2]
* [Intellij IDEA【模拟http请求】][3]
* [IntelliJ IDEA 插件 HTTP Client][4]
* [HTTP Client reference][5]
* [Response Handling Examples][6]

[1]: https://www.jb51.net/article/141856.htm
[2]: https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html
[3]: https://blog.csdn.net/tanqian351/article/details/52574506
[4]: https://www.jianshu.com/p/0be2fccc99e4?utm_campaign=hugo&utm_medium=reader_share&utm_content=note
[5]: https://www.jetbrains.com/help/idea/http-client-reference.html#global-variables-storage-reference
[6]: https://www.jetbrains.com/help/idea/http-response-handling-examples.html