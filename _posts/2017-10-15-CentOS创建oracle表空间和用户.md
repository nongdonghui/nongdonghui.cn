---
layout: post
title: CentOS创建oracle表空间和用户
categories: oracle
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
1.可以在plsql中登录system用户后直接运行创建用户和表空间的命令脚本,实际脚本如下:

```
create tablespace user_name
logging
datafile '/oracle/app/oradata/orcl/user_name.dbf' 
size 168m
autoextend on 
next 100m 
extent management local;

create temporary tablespace user_name_tem
tempfile '/oracle/app/oradata/orcl/user_name_tem.dbf' 
size 168m
autoextend on 
next 100m 
extent management local;

create user user_name
  identified by user_password
  default tablespace user_name
  temporary tablespace user_name_tem;

grant connect to user_name;
grant exp_full_database to user_name;
grant imp_full_database to user_name;
grant resource to user_name;
grant alter any table to user_name;
grant create any table to user_name;
grant create any view to user_name;
grant delete any table to user_name;
grant drop any table to user_name;
grant drop any view to user_name;
grant select any dictionary to user_name;
grant unlimited tablespace to user_name;
```



**更新列表：**

*



**参考文章：**

* [Linux下oracle创建表空间][1]
* [linux下创建oracle用户表空间][2]

[1]: http://www.360doc.com/content/13/0422/14/1000212_280111704.shtml
[2]: http://blog.csdn.net/kongqz/article/details/4184415

