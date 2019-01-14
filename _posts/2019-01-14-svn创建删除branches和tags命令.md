---
layout: post
title: svn创建删除branches和tags命令
categories: svn
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.创建分支branches

```
svn copy http://svn.example.com/project/trunk \
      http://svn.example.com/project/branches/1.0 -m "Release 1.0
```

2.创建tags

```
svn copy http://svn.example.com/project/trunk \  
      http://svn.example.com/project/tags/1.0 -m "Release 1.0"  
```

3.删除branches

```
svn rm http://svn.example.com/project/branches/1.0 -m "误创建"
```

4.删除tags

```
svn rm http://svn.example.com/project/tags/1.0 -m "误创建"
```


**参考文章：**

* [svn创建branches、tags命令][1]

[1]: https://blog.csdn.net/seequan/article/details/40656489