---
layout: post
title: SQLServer规范
categories: SQLServer
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.存储过程格式规范例子

```
CREATE PROCEDURE PROC_INSERT_DATA_ID
  @DealerID varchar(50)
AS
BEGIN
    DECLARE @COUNT  INT    
    
    SET @COUNT = (SELECT COUNT(*) FROM myDATA_Details WHERE DealerID = @DealerID)
    IF (@COUNT>0)    
        BEGIN    
            DELETE FROM myDATA_Details WHERE DealerID = @DealerID    
            INSERT INTO myDATA_Details (DealerID) VALUES (@DealerID)    
        END    
    ELSE    
        BEGIN    
            INSERT INTO myDATA_Details (DealerID) VALUES (@DealerID)    
        END    
END

```



**更新列表：**

*



**参考文章：**

* [SQL Server存储过程创建和修改][1]
* [SQL：查找被锁的表，以及锁表的SQL语句（重点推荐）][2]
* [][3]
* [][4]

[1]: http://www.cnblogs.com/sosoft/p/3535696.html
[2]: https://www.cnblogs.com/Fooo/p/3552861.html
[3]: 
[4]: 

