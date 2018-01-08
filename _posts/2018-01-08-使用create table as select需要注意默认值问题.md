---
layout: post
title: 使用create table as select需要注意默认值问题
categories: 数据库
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


1、再做一些数据迁移时候，很多人会使用create table  as select * from table where id=-1的方式来年建立一摸一样的表，但是这样做有个很大的弊端，不能将原表中的default value也一同迁移过来。

2、  Using the CREATE TABLE ... AS SELECT ... command: This command will copy acrooss to the new table all the data,but the constraints triggers ,and so on will not be transferred to the new table.

     那些都是not null约束，其他的约束和trigger是带不过来了，严格说来not null也是约束的一种，只不过教材上把它排除在外了吧。



**更新列表：**



**参考文章：**


* [慎用create table as select,一定要注意默认值的问题][1]

[1]: http://blog.csdn.net/haiross/article/details/17002119
