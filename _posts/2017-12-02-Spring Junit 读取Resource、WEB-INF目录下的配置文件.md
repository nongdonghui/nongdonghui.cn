---
layout: post
title: Spring Junit 读取Resource、WEB-INF目录下的配置文件
categories: spring
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
@RunWith(SpringJUnit4ClassRunner.class)  
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
```

```
@RunWith(SpringJUnit4ClassRunner.class)  
@ContextConfiguration(locations={"file:src/main/webapp/WEB-INF/applicationContext.xml"})
```


**更新列表：**



**参考文章：**

* [Spring Junit 读取Resource、WEB-INF目录下的配置文件][1]

[1]: http://blog.csdn.net/peiwuyang/article/details/43674573
