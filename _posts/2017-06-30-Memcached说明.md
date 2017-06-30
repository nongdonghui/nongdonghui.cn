---
layout: post
title: Memcached说明
categories: Memcached
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.Memcached是一个自由开源的，高性能，分布式内存对象缓存系统。

本质上，它是一个简洁的key-value存储系统。

2.它是内存中存储缓存，集群的时候也是存储在内存中

3.它是分布式的，使用CAS确保数据一致性

所谓的CAS（Check-And-Set 或 Compare-And-Swap），是在写操作时，先检查是否被别的线程修改过，是用了"版本号"思想实现的

4.Memcached的应用场景是大型分布式系统中


**更新列表：**

*



**参考文章：**

* [Memcache CAS协议介绍及使用][1]
* [Memcached CAS 命令][2]


[1]: http://blog.csdn.net/zhu_tianwei/article/details/44651325
[2]: http://www.runoob.com/memcached/memcached-cas.html
