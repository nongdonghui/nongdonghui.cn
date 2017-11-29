---
layout: post
title: systemd下的core dump
categories: centos
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  1.查看是否开启

  ```
ulimit -c
  ```

  如果为0是不开启,非0是开始

  2.开启

  ```
ulimit -c unlimited
  ```



**更新列表：**

*



**参考文章：**

* [systemd下的core dump(内核转储)][1]

[1]: http://m.blog.csdn.net/iSpeller/article/details/20232089
