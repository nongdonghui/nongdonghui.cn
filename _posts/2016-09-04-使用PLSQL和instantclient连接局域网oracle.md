---
layout: post
title: 使用PLSQL和instantclient连接局域网oracle
categories: oracle
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

步骤：  
1.查看服务器安装的Oracle版本：  
  方法1：在命令行直接执行sqlplus -v  
  方法2：select * from v$version  
2.从[这里][4]下载服务器版本相应的客户端版本，如果是windows，必须下载32-bit版本的，解压  
3.从[这里][5]下载32-bit版本的PLSQL，安装  
4.在客户端解压根目录下建一个NETWORK文件夹，再在NETWORK文件夹内建一个ADMIN文件夹，在ADMIN文件夹内新建sqlnet.ora文件和tnsnames.ora文件，sqlnet.ora内容是
```
SQLNET.AUTHENTICATION_SERVICES= (NTS)
```
tnsnames.ora文件内容是  
```
FOTONSYS =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.0.100)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = FOTONSYS)
    )
  )
```
其中SERVICE_NAME等于服务器的oracle实例名，HOST是服务器的IP地址，PORT是端口号  
5.配置环境变量-新建系统变量：
```
TNS_ADMIN=C:\x5\instantclient_11_2\NETWORK\ADMIN
NLS_LANG=AMERICAN_AMERICA.ZHS16GBK
ORACLE_CLIENT=C:\x5\instantclient_11_2
```
把%ORACLE_CLIENT%;放到Path中  
6.首次打开PLSQL，点取消，Tools-Preferences，设置  
```
Oracle Home=C:\x5\instantclient_11_2，
OCI library=C:\x5\instantclient_11_2\oci.dll
```
7.登录PLSQL，用户名、密码、Database=//192.168.0.100:1521/orcl

遇到的问题：
```
Initialization error
Could not load "C:\x5\instantclient_11_2\oci.dll"
OCIDLL forced to C:\x5\instantclient_11_2\oci.dll
LoadLibrary(F:\oracle\bin\oci.dll) returned 0
```
原因：由于使用的是64位的PLSQL，和客户端的32位版本不一致


**更新列表：**

*



**参考文章：**

* [Installing and configuring PL/SQL Developer][1]
* [Win7 x64 PL/SQL 连接 Oralce 提示 Could not initialize "%ORACLE_HOME%\bin\oci.dll"][2]
* [http://blog.csdn.net/angus_17/article/details/7762472][3]


[1]: http://o7planning.org/en/10255/installing-and-configuring-pl-sql-developer#a27421
[2]: http://blog.csdn.net/hemingwang0902/article/details/7027543
[3]: http://blog.csdn.net/angus_17/article/details/7762472
[4]: http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html
[5]: https://www.allroundautomations.com/bodyplsqldevreg.html
