---
layout: post
title: MyBatis转换报不支持从OTHER到BINARY的转换
categories: MyBatis
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.type.TypeException:
 Could not set parameters for mapping: ParameterMapping{property='params', mode=IN, javaType=class j
ava.lang.String, jdbcType=null, numericScale=null, resultMapId='null', jdbcTypeName='null', expressi
on='null'}. Cause: org.apache.ibatis.type.TypeException: Error setting null for parameter #6 with Jd
bcType OTHER . Try setting a different JdbcType for this parameter or a different jdbcTypeForNull co
nfiguration property. Cause: com.microsoft.sqlserver.jdbc.SQLServerException: 不支持从 OTHER 到 BINA
RY 的转换。
        at org.mybatis.spring.MyBatisExceptionTranslator.translateExceptionIfPossible(MyBatisExcepti
onTranslator.java:79)
```

原因是在插入数据库的时候,没有设置对应字段的类型,正确如下:

```
insert into sys_log
(
    user_id, 
    username, 
    operation, 
    time, 
    method, 
    params, 
    ip, 
    gmt_create
)
values
(
    #{userId,jdbcType=INTEGER}, 
    #{username,jdbcType=VARCHAR}, 
    #{operation,jdbcType=VARCHAR}, 
    #{time,jdbcType=INTEGER}, 
    #{method,jdbcType=VARCHAR}, 
    #{params,jdbcType=VARCHAR}, 
    #{ip,jdbcType=VARCHAR}, 
    #{gmtCreate,jdbcType=TIMESTAMP}
)
```


**更新列表：**



**参考文章：**

* [MYBATIS 插入空值时报错 TYPEEXCEPTION][1]


[1]: http://www.cnblogs.com/yun965861480/p/6906883.html
