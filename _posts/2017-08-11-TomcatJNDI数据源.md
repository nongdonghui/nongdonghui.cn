---
layout: post
title: Tomcat发布后控制台乱码
categories: tomcat
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 银川 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
1.修改apache-tomcat-a.b.cd/conf/context.xml

```
<Context ...>
  ...
  <Resource name="jdbc/EmployeeDB"
            auth="Container"
            type="javax.sql.DataSource"
            username="dbusername"
            password="dbpassword"
            driverClassName="org.hsql.jdbcDriver"
            url="jdbc:HypersonicSQL:database"
            maxTotal="8"
            maxIdle="4"/>
  ...
</Context>
```

2.读取

```
Context initCtx = new InitialContext();
Context envCtx = (Context) initCtx.lookup("java:comp/env");
DataSource ds = (DataSource)
  envCtx.lookup("jdbc/EmployeeDB");

Connection conn = ds.getConnection();
... use this connection to access the database ...
conn.close();
```

结果：正常显示中文


**更新列表：**

*



**参考文章：**

* [JNDI Resources HOW-TO][1]


[1]: http://tomcat.apache.org/tomcat-8.5-doc/jndi-resources-howto.html
