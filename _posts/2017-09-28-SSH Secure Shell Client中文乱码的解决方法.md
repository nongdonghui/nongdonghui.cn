---
layout: post
title: SSH Secure Shell Client中文乱码的解决方法
categories: linux
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
```
#vi /etc/sysconfig/i18n
```

将内容改为

```
LANG="zh_CN.GB18030"
LANGUAGE="zh_CN.GB18030:zh_CN.GB2312:zh_CN"
SUPPORTED="zh_CN.GB18030:zh_CN:zh:en_US.UTF-8:en_US:en"
SYSFONT="lat0-sun16"
```


**更新列表：**

*



**参考文章：**

* [SSH Secure Shell Client中文乱码的解决方法][1]


[1]: http://www.cnblogs.com/52linux/archive/2012/03/24/2415082.html