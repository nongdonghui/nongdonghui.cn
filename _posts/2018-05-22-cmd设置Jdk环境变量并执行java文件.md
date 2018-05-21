---
layout: post
title: cmd设置Jdk环境变量并执行java文件
categories: java
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.

```
@echo off
title 数据库连接测试
set JAVA_HOME=C:\Program Files (x86)\IBM\Java60
set CLASSPATH=.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
set PATH=%JAVA_HOME%\bin;%PATH%
set LIB=.;.\sikuli-api-1.0.2-standalone.jar
java -Xmx128M -cp %LIB% -jar DbConnectionTest.jar
pause
```

其中LIB指定第三方依赖库

2.

```
@echo off
setx JAVA_HOME "C:\Program Files (x86)\IBM\Java60"
setx CLASSPATH ".;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;"
setx PATH "%JAVA_HOME%\bin;%PATH%"
set LIB=.;.\sikuli-api-1.0.2-standalone.jar
java -Xmx128M -cp %LIB% -jar DbConnectionTest.jar
pause
```

set用于设置临时变量
setx用于设置用户变量和系统变量，设置完后不会立即生效，如要立即生效需要使用WMIC：

```
wmic ENVIRONMENT where "name='path' and username='<SYSTEM>'" set VariableValue='%path%;C:\'
```

**更新列表：**

*



**参考文章：**

* [cmd设置Jdk环境变量并执行java文件][1]
* [][2]
* [][3]
* [][4]


[1]: https://blog.csdn.net/dongtianlaile/article/details/21159171
[2]: 
[3]: 
[4]: 