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

2.SQLSERVER merge的简单用法

```
MERGE INTO @TargetTable AS T           
USING @SourceTable AS S                
   ON T.ID = S.ID                      
WHEN MATCHED         
   THEN UPDATE SET T.DSPT = S.DSPT  
WHEN NOT MATCHED BY TARGET   
   THEN INSERT VALUES(S.ID,S.DSPT)
WHEN NOT MATCHED BY SOURCE            
   THEN DELETE
OUTPUT $ACTION AS [ACTION],
   Deleted.ID AS 'Deleted ID',
   Deleted.DSPT AS 'Deleted Description',
   Inserted.ID AS 'Inserted ID',
   Inserted.DSPT AS 'Inserted Description'
INTO @Log;
```

3.数据库对象 

 ```
表 (Table)

字段(Column)

视图 (View)

存储过程 (Stored procedure)

触发器(Trigger)

索引(Index)

主键(Primary key)

外键(Foreign key)

Check 约束(Check Constraint)

Default 约束(Default Constraint)

用户定义数据类型 (User-defined data type)

用户定义函数 (User-defined function) 
```

4.命名规范

```
1.标识符必须以字符开头,且不能超过30个字符(标识符:即用户自定义的关键词，比如表名、字段名、视图名、序列名、主键等)
2.标识符全部大写,单词多了可以适当缩写
3.多个单词间用下划线（_）进行连接
4.若库中有多个系统，表名采用系统名称+单词或多个单词
5.视图view:vi_
6.存储过程:sp_
7.索引:idx_
8.触发器:tr_, Insert触发器加'_i'，Delete触发器加'_d'，Update触发器加'_u'
9.函数:fn_
```

```
1.查询数据库所有触发器名称
use msdb
SELECT object_name(a.parent_obj) as [表名] ,a.name as [触发器名称] ,
(case when b.is_disabled=0 then '启用' else '禁用' end) as [状态] ,b.create_date as [创建日期] ,
b.modify_date as [修改日期] ,c.text as [触发器语句] 
FROM sysobjects a
INNER JOIN sys.triggers b 
ON b.object_id=a.id 
INNER JOIN syscomments c
ON c.id=a.id
WHERE a.xtype='tr' 
ORDER BY [表名]

2.查询所有索引名称
SELECT  索引名称=a.name 
,表名=c.name 
,索引字段名=d.name 
,索引字段位置=d.colid 
FROM  sysindexes  a 
JOIN  sysindexkeys  b  ON  a.id=b.id  AND  a.indid=b.indid 
JOIN  sysobjects  c  ON  b.id=c.id 
JOIN  syscolumns  d  ON  b.id=d.id  AND  b.colid=d.colid 
WHERE  a.indid NOT IN(0,255) 
 and  c.xtype='U' 
```

5.查询数据库字段

```
select a.name as col_name,k.remarks,t.name as type,
case when (t.name='date' or t.name='datetime' or t.name='int' or t.name='text') then '' 
     when t.name='decimal' then cast(a.precision as varchar(10))+','+cast(a.scale as varchar(10))     
     else cast(a.max_length as varchar(10))
end as length
from sys.columns a
left join sys.objects b on a.object_id=b.object_id 
left join sys.types t on a.system_type_id=t.system_type_id
left join (
	select a.name as table_name, b.name as column_name, c.value as remarks   
	from sys.tables a 
		left join sys.columns b on a.object_id=b.object_id  
		left join sys.extended_properties c on a.object_id=c.major_id  
	where a.name='MM_BNBase' 
	and c.minor_id<>0 
	and b.column_id=c.minor_id  
	and a.schema_id=(
		select schema_id from sys.schemas where name='dbo'  
	)
) k on k.column_name = a.name
where b.type = 'U' 
and charindex('UDT',t.name,0)<=0 
and charindex('sys',t.name,0)<=0 
and b.name ='MM_BNBase'
```

6.查看SQL SERVER 数据库正在执行的语句和时长等

```
SELECT session_Id,
--ecid, 
--sp.dbid,
--DB_NAME(sp.dbid) as DB_NM, 
--nt_username,
er.status,
wait_type,
SUBSTRING (qt.text, er.statement_start_offset/2,
(CASE WHEN er.statement_end_offset = -1 THEN LEN(CONVERT(NVARCHAR(MAX), qt.text)) * 2
ELSE er.statement_end_offset END - er.statement_start_offset)/2) as CurrentSQL,
qt.text,
--program_name,
--Hostname,
start_time,
DATEDIFF ( millisecond,start_time, GETDATE() ) AS execTime
FROM sys.dm_exec_requests er
INNER JOIN sys.sysprocesses sp ON er.session_id = sp.spid
CROSS APPLY sys.dm_exec_sql_text(er.sql_handle)as qt
WHERE session_Id > 50
AND session_Id NOT IN (@@SPID)
--and sp.dbid=7
ORDER BY DATEDIFF ( millisecond,start_time, GETDATE() ) desc
```

**更新列表：**

*



**参考文章：**

* [SQL Server存储过程创建和修改][1]
* [SQL：查找被锁的表，以及锁表的SQL语句（重点推荐）][2]
* [SQLSERVER merge的简单用法][3]
* [查看SQL-Server数据库所有触发器信息][4]
* [【整理】SQLServer查询各种数据库对象（表，索引，视图，图表，存储过程等）][5]
* [sqlserver查询表索引语句][6]
* [SQL Server如何查看SQL语句的执行时间][7]
* [Sqlserver查询表描述和字段相关信息][8]
* [][9]

[1]: http://www.cnblogs.com/sosoft/p/3535696.html
[2]: https://www.cnblogs.com/Fooo/p/3552861.html
[3]: https://blog.csdn.net/ws379374000/article/details/78499767
[4]: https://blog.csdn.net/wang_cel/article/details/50418323
[5]: https://www.cnblogs.com/NaturalSelection/p/4208937.html
[6]: https://blog.csdn.net/qq_34397273/article/details/79599964
[7]: https://ld.sogou.com/article?aid=3001586722
[8]: https://blog.csdn.net/smartsmile2012/article/details/80950906
[9]: https://blog.csdn.net/fzgjf08/article/details/54580042