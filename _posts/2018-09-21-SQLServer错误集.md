---
layout: post
title: SQLServer错误集
categories: SQLServer
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.创建远程链接后，需要调用远程链接时，需要允许RPC访问

```

在数据库的Server Objects下的linked server设置RPC时，提示：Ad hoc updates to system catalogs are not allowed.

Server: *******'' is not configured for RPC.

在链接服务器的属性、Server Options页面上，RPC和RPC OUT的勾都没有选中，勾选之后再试问题解决。 

或用命令

EXEC master.dbo.sp_serveroption @server=N'HISSVR', @optname=N'rpc', @optvalue=N'True'
GO

EXEC master.dbo.sp_serveroption @server=N'HISSVR', @optname=N'rpc out', @optvalue=N'true'
GO

```

2.Sql Server Function函数 is not a recognized built-in function name

记住dbo.函数名称 否则报错


**更新列表：**

*



**参考文章：**

* [Sql 链接服务器设置][1]
* [Sql Server Function函数 is not a recognized built-in function name][2]
* [][3]
* [][4]

[1]: https://blog.csdn.net/liyuchun00/article/details/8694900
[2]: https://blog.csdn.net/chenghaibing2008/article/details/11773521
[3]: 
[4]: 

