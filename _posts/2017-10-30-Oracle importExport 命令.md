---
layout: post
title: Oracle importExport 命令
categories: oracle
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

Oracle import/Export 命令

通过以下命令可以查看说明。
c:\>imp help=y
c:\>exp help=y

exp/imp 实例
    exp help=y 查看帮助
exp
1、exp usr/pwd@sid file=c:\tb.dump tables=tb1
   如果是导出多个表，tables=(tb1、tb2)
2、exp usr/pwd@sid file=c:\tb.dump --全部导出
3、exp usr/pwd@sid file=c:\tb.dump owner=(system,sys) 
   将用户system和sys用户下的表都导出
4、exp usr/pwd@sid file=c:\tb.dump tables=tb1 query=\"where name='ha'\"
   注意分号的位置

**更新列表：**



**参考文章：**

* [Oracle import/Export 命令][1]


[1]: http://www.cnblogs.com/xhk1228/p/Oracle_EXP_IMP.html
