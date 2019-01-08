---
layout: post
title: SpringBoot配置静态属性
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
private static String name3;

private static Integer age3;

private static String height3;

@Value("${zzp3.name}")
public void setName3(String name3) {
   Round2Controller.name3 = name3;
}

@Value("${zzp3.age}")
public void setAge3(Integer age3) {
   Round2Controller.age3 = age3;
}

@Value("${zzp3.height}")
public void setHeight3(String height3) {
   Round2Controller.height3 = height3;
}
```

**更新列表：**

*



**参考文章：**

* [SpringBoot开发详解（三）--SpringBoot配置文件YML注意事项][1]
* [][2]
* [][3]


[1]: https://blog.csdn.net/qq_31001665/article/details/70197543
[2]: 
[3]: 