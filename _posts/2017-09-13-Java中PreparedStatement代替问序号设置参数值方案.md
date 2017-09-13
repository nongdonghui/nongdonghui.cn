---
layout: post
title: Java中PreparedStatement代替问序号设置参数值方案
categories: java
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 银川 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
在java中使用PreparedStatement时,设置值的序号是从1开始,容易出错,不易维护

方法1:使用一个变量自增的方法

方法2:使用一个包装类,将变量使用:column这种方式入参,核心代码如下:

```java

原始方式代码:
conn = getConnection();
PreparedStatement ps = conn.prepareStatement("update table set field2=? where field2=?");
ps.setInt(1, 1000);
ps.setInt(2, 10);
... ...

修改后代码:
conn = getConnection();
PreparedStatement ps = null;
PreStateWraper psw = new PreStateWraper(conn, "update table set field2=:field1 where field2=:field2");  // 注意sql中的参数名称前必须加":"而且他们之间不能有空格
psw.setInt("field1", 1000);  // 如果sql语句中出现两次以上的field1参数，也只需set一次
psw.setInt("field2", 10);
... ...

核心方法:
public PreStateWraper(Connection conn, String sql) throws SQLException {
    String psql = checkSql(sql);
    preState = conn.prepareStatement(psql);
}

private String checkSql(String sql) {
    Pattern pt = Pattern.compile(":(\\w*)");
  
    Matcher matcher = pt.matcher(sql);
  
    int pp = 0;
    while (matcher.find()) {
    pp++;
    String pname = matcher.group(1);
    List list = parameters.get(pname);
    if (list == null)
        list = new ArrayList();
        list.add(pp);
   
        parameters.put(pname, list);
        sql = matcher.replaceFirst("?");
        matcher = pt.matcher(sql);
    }
  
    return sql;
}
```



**更新列表：**

*



**参考文章：**

* [包装了java的preparedstatement(改进设置参数)][1]


[1]: http://blog.sina.com.cn/s/blog_58bbe08c010091vr.html
