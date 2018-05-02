---
layout: post
title: Spring Boot 中文乱码问题
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

添加配置:

```
@Bean
public CharacterEncodingFilter characterEncodingFilter() {
    CharacterEncodingFilter filter = new CharacterEncodingFilter();
    filter.setEncoding("UTF-8");
    filter.setForceEncoding(true);
    return filter;
}
```

**更新列表：**

*



**参考文章：**

* [Spring Boot 中文乱码问题][1]
* [How to config spring boot application to support both UTF-8 and GBK encode?][2]


[1]: https://www.huangyunkun.com/2015/02/01/spring-boot-utf8-filter/
[2]: https://stackoverflow.com/questions/39939555/how-to-config-spring-boot-application-to-support-both-utf-8-and-gbk-encode
