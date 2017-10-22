---
layout: post
title: CentOS下Permission Denied
categories: centos
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
-bash:/etc/profile Permission Denied

解决办法：

在root的用户下查看etc目录权限，为744；这个权限是有问题的，其他用户没有列出etc目录下文件的权限，所以其他用户登录会报错！

chmod +x /etc  或者   chmod 755 /etc

给/etc/目录加上x权限即可解决问题。

如果root用户也出现该问题，可能的原因是/目录权限问题，

stat /     查看根目录权限，保持为755即可！


**更新列表：**

*



**参考文章：**

* [-bash:/etc/profile Permission Denied][1]

[1]: https://yq.aliyun.com/articles/65212

