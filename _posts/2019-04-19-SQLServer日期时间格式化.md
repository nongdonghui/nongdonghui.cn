---
layout: post
title: SQLServer日期时间格式化
categories: SQLServer
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
Select CONVERT(varchar(100), GETDATE(), 0): 05 16 2006 10:57AM
Select CONVERT(varchar(100), GETDATE(), 1): 05/16/06
Select CONVERT(varchar(100), GETDATE(), 2): 06.05.16
Select CONVERT(varchar(100), GETDATE(), 3): 16/05/06
Select CONVERT(varchar(100), GETDATE(), 4): 16.05.06
Select CONVERT(varchar(100), GETDATE(), 5): 16-05-06
Select CONVERT(varchar(100), GETDATE(), 6): 16 05 06
Select CONVERT(varchar(100), GETDATE(), 7): 05 16, 06
Select CONVERT(varchar(100), GETDATE(), 8): 10:57:46
Select CONVERT(varchar(100), GETDATE(), 9): 05 16 2006 10:57:46:827AM
Select CONVERT(varchar(100), GETDATE(), 10): 05-16-06
Select CONVERT(varchar(100), GETDATE(), 11): 06/05/16
Select CONVERT(varchar(100), GETDATE(), 12): 060516
Select CONVERT(varchar(100), GETDATE(), 13): 16 05 2006 10:57:46:937
Select CONVERT(varchar(100), GETDATE(), 14): 10:57:46:967
Select CONVERT(varchar(100), GETDATE(), 20): 2006-05-16 10:57:47
Select CONVERT(varchar(100), GETDATE(), 21): 2006-05-16 10:57:47.157
Select CONVERT(varchar(100), GETDATE(), 22): 05/16/06 10:57:47 AM
Select CONVERT(varchar(100), GETDATE(), 23): 2006-05-16
Select CONVERT(varchar(100), GETDATE(), 24): 10:57:47
Select CONVERT(varchar(100), GETDATE(), 25): 2006-05-16 10:57:47.250
Select CONVERT(varchar(100), GETDATE(), 100): 05 16 2006 10:57AM
Select CONVERT(varchar(100), GETDATE(), 101): 05/16/2006
Select CONVERT(varchar(100), GETDATE(), 102): 2006.05.16
Select CONVERT(varchar(100), GETDATE(), 103): 16/05/2006
Select CONVERT(varchar(100), GETDATE(), 104): 16.05.2006
Select CONVERT(varchar(100), GETDATE(), 105): 16-05-2006
Select CONVERT(varchar(100), GETDATE(), 106): 16 05 2006
Select CONVERT(varchar(100), GETDATE(), 107): 05 16, 2006
Select CONVERT(varchar(100), GETDATE(), 108): 10:57:49
Select CONVERT(varchar(100), GETDATE(), 109): 05 16 2006 10:57:49:437AM
Select CONVERT(varchar(100), GETDATE(), 110): 05-16-2006
Select CONVERT(varchar(100), GETDATE(), 111): 2006/05/16
Select CONVERT(varchar(100), GETDATE(), 112): 20060516
Select CONVERT(varchar(100), GETDATE(), 113): 16 05 2006 10:57:49:513
Select CONVERT(varchar(100), GETDATE(), 114): 10:57:49:547
Select CONVERT(varchar(100), GETDATE(), 120): 2006-05-16 10:57:49
Select CONVERT(varchar(100), GETDATE(), 121): 2006-05-16 10:57:49.700
Select CONVERT(varchar(100), GETDATE(), 126): 2006-05-16T10:57:49.827
Select CONVERT(varchar(100), GETDATE(), 130): 18 ???? ?????? 1427 10:57:49:907AM
Select CONVERT(varchar(100), GETDATE(), 131): 18/04/1427 10:57:49:920AM


常用：
Select CONVERT(varchar(100), GETDATE(), 8): 10:57:46
Select CONVERT(varchar(100), GETDATE(), 24): 10:57:47
Select CONVERT(varchar(100), GETDATE(), 108): 10:57:49
Select CONVERT(varchar(100), GETDATE(), 12): 060516
Select CONVERT(varchar(100), GETDATE(), 23): 2006-05-16

 

SQL中CONVERT转化函数的用法

CONVERT的使用方法:

////////////////////////////////////////////////////////////////////////////////////////

格式:
CONVERT(data_type,e­xpression[,style])

说明:
此样式一般在时间类型(datetime,smalldatetime)与字符串类型(nchar,nvarchar,char,varchar)
相互转换的时候才用到.

例子:
Select CONVERT(varchar(30),getdate(),101) now
结果为
now
---------------------------------------
09/15/2001

/////////////////////////////////////////////////////////////////////////////////////

style数字在转换时间时的含义如下

-------------------------------------------------------------------------------------------------
Style(2位表示年份) | Style(4位表示年份) | 输入输出格式 
-------------------------------------------------------------------------------------------------
- | 0 or 100 | mon dd yyyy hh:miAM(或PM) 
-------------------------------------------------------------------------------------------------
1 | 101 | mm/dd/yy 
-------------------------------------------------------------------------------------------------
2 | 102 | yy-mm-dd 
-------------------------------------------------------------------------------------------------
3 | 103 | dd/mm/yy 
-------------------------------------------------------------------------------------------------
4 | 104 | dd-mm-yy 
-------------------------------------------------------------------------------------------------
5 | 105 | dd-mm-yy 
-------------------------------------------------------------------------------------------------
6 | 106 | dd mon yy 
-------------------------------------------------------------------------------------------------
7 | 107 | mon dd,yy 
-------------------------------------------------------------------------------------------------
8 | 108 | hh:mm:ss 
-------------------------------------------------------------------------------------------------
- | 9 or 109 | mon dd yyyy hh:mi:ss:mmmmAM(或PM)
-------------------------------------------------------------------------------------------------
10 | 110 | mm-dd-yy 
-------------------------------------------------------------------------------------------------
11 | 111 | yy/mm/dd 
-------------------------------------------------------------------------------------------------
12 | 112 | yymmdd 
-------------------------------------------------------------------------------------------------
- | 13 or 113 | dd mon yyyy hh:mi:ss:mmm(24小时制) 
-------------------------------------------------------------------------------------------------
14 | 114 | hh:mi:ss:mmm(24小时制) 
-------------------------------------------------------------------------------------------------
- | 20 or 120 | yyyy-mm-dd hh:mi:ss(24小时制) 
-------------------------------------------------------------------------------------------------
- | 21 or 121 | yyyy-mm-dd hh:mi:ss:mmm(24小时制)
```



**更新列表：**



**参考文章：**

* [SQLServer][1]


[1]: https://blog.csdn.net/ganfengguang/article/details/49736923