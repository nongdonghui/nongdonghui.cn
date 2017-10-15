---
layout: post
title: CentOS下oracle11g启动与关闭监听
categories: oracle
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
1.实际启动案例脚本如下:

```
nohup /usr/local/nginx/sbin/nginx
export ORACLE_SID=orcl2
su - oracle
sqlplus "/as sysdba"
startup
exit
lsnrctl start
lsnrctl status
```

* 其中nohup命令是为了在退出ssh的时候,服务仍然可用

* export是为了解决oracle_sid不一致,默认的oracle_sid是orcl,即默认的数据库实例,如果自定义了,就需要修改启动的实例名

* lsnrctl start是启动监听程序


**更新列表：**

*



**参考文章：**

* [Centos下oracle11g R2的启动与关闭监听、数据库][1]
* [centos下手动启动oracle][2]

[1]: http://pizibaidu.blog.51cto.com/1361909/1612354
[2]: http://blog.csdn.net/baochanghong/article/details/51525901

