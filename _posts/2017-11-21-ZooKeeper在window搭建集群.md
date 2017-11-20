---
layout: post
title: ZooKeeper在window搭建集群
categories: ZooKeeper
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1. 说明:在window上修改配置文件启动一台的时候,会报:

```
java.net.ConnectException: Connection refused: connect
```

那是因为和其他的集群机器没有互通消息成功,把其他的也启动就没问题了

2.端口说明

```
server.1=localhost:2887:3887
server.2=localhost:2888:3888
server.3=localhost:2889:3889
```

2887 是server 之间通讯的，3887 是应用程序通讯的

**更新列表：**

*



**参考文章：**

* [Zookeeper 在Windows下的安装过程及测试][1]
* [zookeeper windows 入门安装和测试][2]
* [ZooKeeper的安装与部署][3]
* [zookeeper(单机/集群)安装与配置][4]
* [zookeeper Curator框架简单使用][5]
* [分布式锁][6]
* [Apache Curator入门实战][7]

[1]: http://blog.csdn.net/u010317829/article/details/52119281
[2]: https://www.tuicool.com/articles/RzuMFba
[3]: http://blog.csdn.net/lihao21/article/details/51778255
[4]: http://www.cnblogs.com/shoren/p/zookeeper.html
[5]: http://blog.csdn.net/T1DMzks/article/details/78463098
[6]: http://blog.csdn.net/yeah898/article/details/49618303
[7]: http://www.cnblogs.com/seaspring/p/5536338.html