---
layout: post
title: 使用Navicat for Oracle连接局域网或本机Oracle
categories: oracle
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

有时候，安装Oracle客户端不是特别必要，而Oracle提供了绿色版的客户端：Oracle Instant Client，那我们只需要简单配置一下就能连上图形化的Oracle了，很方便，以下是步骤：

* 安装32位Navicat for Oracle

* 到Oracle官网下载相应的Oracle Instant Client客户端32位版本(必须是32位的，64位Oracle也要使用32位客户端)

* 必须下载instantclient-basic-win32-xx.x.x.x.x.zip和instantclient-sqlplus-win32-xx.x.x.x.x.zip

* 解压放到一起

* 配置Navicat for Oracle：  
打开Navicat->工具->选项->其他->OCI  
选择  
OCI libray (oci.dll)*: D:\instantclient_10_2\oci.dll  
SQL*Plus:              D:\instantclient_10_2\sqlplus.exe  

## 总结：

* client的版本要和服务器的数据库版本一致(如11.2.0.1.0)

* oracle的client版本必须是32位的

* navicat的版本也必须是32位的

**更新列表：**

*



**参考文章：**

* [Oracle Instant Client][1]
* [navicat for oracle 11.1.13下载地址][2]

[1]: http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html
[2]: https://www.3322.cc/soft/12921.html
