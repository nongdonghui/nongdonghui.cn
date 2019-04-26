---
layout: post
title: SQLServer规范
categories: SQLServer
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

常用查询语句

```
--1.获取当前所有的驱动器
exec master.dbo.xp_availablemedia

执行结果
    name	low free	high free	media type
1    C:\	633081856	3	2
2    D:\	-2144931840	5	2
3    E:\	1789870080	3	2
4    Q:\	-156397568	1	2
5    F:\	0	0	8

--2.获得子目录列表
exec master.dbo.xp_subdirs 'd:\'

--3.获得“所有”子目录的目录树结构
exec master.dbo.xp_dirtree 'd:\'

--4.数据库所有表空间统计脚本
exec sp_MSForEachTable
@precommand=N'
create table ##(
tname sysname,   --表名称
num int,    --行数
rspace nvarchar(10),  --表分配空间总量
uspace nvarchar(10),  --数据使用空间量
uindex varchar(10),   --索引使用空间量
unuser varchar(10))',  --未用空间量
@command1=N'insert ## exec sp_spaceused ''?''',
@postcommand=N'select * from ## order by num desc '
go
drop table ##
go

--5.

```

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
-- 简化版
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

--完整版
DECLARE @TableName varchar(20)
SET @TableName='HR_Duty'
SELECT
        (CASE when a.colorder=1 then d.name else '' end) AS 表名,
        a.colorder 字段序号,
        a.name 字段名,
        (case when COLUMNPROPERTY( a.id,a.name,'IsIdentity')=1 then '√'else '' end) 标识,
        (case when (SELECT count(*)
        FROM sysobjects
        WHERE (name in
                  (SELECT name
                FROM sysindexes
                WHERE (id = a.id) AND (indid in
                          (SELECT indid
                         FROM sysindexkeys
                         WHERE (id = a.id) AND (colid in
                                   (SELECT colid
                                  FROM syscolumns
                                  WHERE (id = a.id) AND (name = a.name))))))) AND
              (xtype = 'PK'))>0 then '√' else '' end) 主键,
       b.name 类型,
       a.length 占用字节数,
       COLUMNPROPERTY(a.id,a.name,'PRECISION') as 长度,
       isnull(COLUMNPROPERTY(a.id,a.name,'Scale'),0) as 小数位数,
       (case when a.isnullable=1 then '√'else '' end) 允许空,
       isnull(e.text,'') 默认值,
       isnull(g.[value],'') AS 字段说明

FROM syscolumns  a
    LEFT JOIN systypes b on  a.xtype=b.xusertype
    inner join sysobjects d on a.id=d.id  and  d.xtype='U' and  d.name<>'dtproperties'
    left join syscomments e on a.cdefault=e.id
    left join sys.extended_properties g on a.id=g.major_id AND a.colid = g.minor_id
WHERE d.name=@TableName    --如果只查询指定表,加上此条件
order by a.id,a.colorder

SELECT * FROM sys.extended_properties
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

7.SQL监控脚本（适用于SQL Server 2005以上）

```
SELECT  creation_time  N'语句编译时间'
        ,last_execution_time  N'上次执行时间'
        ,total_physical_reads N'物理读取总次数'
        ,total_logical_reads/execution_count N'每次逻辑读次数'
        ,total_logical_reads  N'逻辑读取总次数'
        ,total_logical_writes N'逻辑写入总次数'
        , execution_count  N'执行次数'
        , total_worker_time/1000 N'所用的CPU总时间ms'
        , total_elapsed_time/1000  N'总花费时间ms'
        , (total_elapsed_time / execution_count)/1000  N'平均时间ms'
        ,SUBSTRING(st.text, (qs.statement_start_offset/2) + 1,
         ((CASE statement_end_offset
          WHEN -1 THEN DATALENGTH(st.text)
          ELSE qs.statement_end_offset END
            - qs.statement_start_offset)/2) + 1) N'执行语句'
FROM sys.dm_exec_query_stats AS qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) st
where SUBSTRING(st.text, (qs.statement_start_offset/2) + 1,
         ((CASE statement_end_offset
          WHEN -1 THEN DATALENGTH(st.text)
          ELSE qs.statement_end_offset END
            - qs.statement_start_offset)/2) + 1) not like '%fetch%'
ORDER BY  total_elapsed_time / execution_count DESC 
```

8.查询优化

对数据库查询进行优化，应尽量避免全表扫描，首先应考虑在where 及order by 涉及的列上建立索引

```　
应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描
select id from t where num is null

应尽量避免在 where 子句中使用！=或<>操作符，否则将引擎放弃使用索引而进行全表扫描

应尽量避免在 where 子句中使用 or 来连接条件，否则将导致引擎放弃使用索引而进行全表扫描

in 和 not in 也要慎用，否则会导致全表扫描

如果在 where 子句中使用参数，也会导致全表扫描

应尽量避免在 where 子句中对字段进行表达式操作，这将导致引擎放弃使用索引而进行全表扫描

应尽量避免在where子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描
```
9.查询相关规范

```

```

10.sqlserver decimal转换为str,并去掉无效的位数0

```
create function fun_dec2str(@inValue decimal(38,18), @scale int, @defaultValue varchar(38))
returns varchar(38)
as
begin
	declare @returnValue varchar(38)
	declare @strValue varchar(38)
	
	if (@inValue is null)
		set @strValue = @defaultValue
	else
		if (@scale = 0)
			set @strValue=convert(varchar(38),@inValue)			
		else if (@scale = 1)
			set @strValue=convert(varchar(38),convert(decimal(18,1),@inValue))
		else if(@scale = 2)
			set @strValue=convert(varchar(38),convert(decimal(18,2),@inValue))
		else if(@scale = 3)
			set @strValue=convert(varchar(38),convert(decimal(18,3),@inValue))
		else if(@scale = 4)
			set @strValue=convert(varchar(38),convert(decimal(18,4),@inValue))
		else if(@scale = 5)
			set @strValue=convert(varchar(38),convert(decimal(18,5),@inValue))
		else
			set @strValue=convert(varchar(38),convert(decimal(18,6),@inValue))
		
	if(@scale = 0 and charindex('.', @strValue)>0) -- 有小数点,四舍五入
		if (substring(reverse(@strValue),patindex('%[^0]%',reverse(@strValue)),1)='.')
			set @strValue=substring(@strValue,0,charindex('.', @strValue))
		else
			set @strValue =left(@strValue,len(@strValue)- patindex('%[^0]%.%',reverse(@strValue))+1)
			
	if(@scale = 0 and charindex('.', @strValue)>0)
		set @strValue = convert(varchar(38),convert(decimal(18),@strValue))
	
	if(@strValue is null or @strValue = '') -- null或空字符
		set @returnValue=''
	else if(charindex('.', @strValue)=0) -- 没有小数点
		set @returnValue=@strValue
	else if(substring(reverse(@strValue),patindex('%[^0]%',reverse(@strValue)),1)='.') -- 小数点后全是0的
		set @returnValue=left(@strValue,len(@strValue)-patindex('%[^0]%',reverse(@strValue)))
	else
		set @returnValue =left(@strValue,len(@strValue)- patindex('%[^0]%.%',reverse(@strValue))+1) -- 小数点后有0
			
	return @returnValue	
end

/*
    -- 测试用例
	select dbo.fun_dec2str(null,1,'')        -- expected : 
	select dbo.fun_dec2str('',1,'')          -- expected : error
	select dbo.fun_dec2str(616419,0,'')      -- expected : 616419
	select dbo.fun_dec2str(616419.00,0,'')   -- expected : 616419
	select dbo.fun_dec2str(616419.05,0,'')   -- expected : 616419
	select dbo.fun_dec2str(616419.050,0,'')  -- expected : 616419
	select dbo.fun_dec2str(616419.50,0,'')   -- expected : 616419
	
	select dbo.fun_dec2str(null,1,'')        -- expected : 
	select dbo.fun_dec2str('',1,'')          -- expected : error
	select dbo.fun_dec2str(616419,1,'')      -- expected : 616419
	select dbo.fun_dec2str(616419.00,1,'')   -- expected : 616419
	select dbo.fun_dec2str(616419.05,1,'')   -- expected : 616419.1
	select dbo.fun_dec2str(616419.050,1,'')  -- expected : 616419.1
	select dbo.fun_dec2str(616419.50,1,'')   -- expected : 616419.5
*/
```

11.sqlserver中按字符分割字符串

创建函数

```
--方法1：循环截取法
CREATE FUNCTION Fun_split(@s     VARCHAR(8000),--待分拆的字符串
                          @split VARCHAR(10) --数据分隔符
)
RETURNS @re TABLE(
  col VARCHAR(100))
AS
  BEGIN
      DECLARE @splitlen INT

      SET @splitlen=Len(@split + 'a') - 2

      WHILE Charindex(@split, @s) > 0
        BEGIN
            INSERT @re
            VALUES(LEFT(@s, Charindex(@split, @s) - 1))

            SET @s=Stuff(@s, 1, Charindex(@split, @s) + @splitlen, '')
        END

      INSERT @re
      VALUES(@s)

      RETURN
  END

GO
```

使用方法:因为返回的是一个table,只有一列col,可以直接用

```
select col as '拆分列表' from dbo.Fun_split('a,b,c,d', ',')
```

12.SQLServer判断临时表字段是否存在

```
-查询所有列名
select name from tempdb.sys.columns where object_id = OBJECT_ID('tempdb.dbo.#tempTB')

if col_length('tempdb.dbo.#TempTB','columnName') is not null
  print '存在'
else
  print '不存在'
```

13.使用动态语句创建游标

```
http://www.manjuke.com/2012/11/create-cursor-using-dynamic-sql-query.html

CREATE PROCEDURE [dbo].[Gsp_Create_GenericCursor]
    /* Parameters */
    @vQuery        NVARCHAR(MAX)
    ,@Cursor    CURSOR VARYING OUTPUT
AS
BEGIN
    SET NOCOUNT ON
    
    DECLARE 
        @vSQL        AS NVARCHAR(MAX)
    
    SET @vSQL = 'SET @Cursor = CURSOR FORWARD_ONLY STATIC FOR ' + @vQuery + ' OPEN @Cursor;'
    
   
    EXEC sp_executesql
         @vSQL
         ,N'@Cursor cursor output'  
         ,@Cursor OUTPUT;
END


DECLARE @obj AS CURSOR
DECLARE @i AS INT    
 
 
    EXEC dbo.Gsp_Create_GenericCursor 
        @vQuery = N'SELECT 1 AS FLD1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4'
        ,@Cursor = @obj OUTPUT
        
        FETCH NEXT FROM @obj INTO @i
        
        WHILE (@@FETCH_STATUS = 0)
        BEGIN
            PRINT @i
            
            FETCH NEXT FROM @obj INTO @i
        END
        
        CLOSE @obj
        DEALLOCATE @obj
```

14.查看数据库当前连接数

```
SELECT * FROM 
[Master].[dbo].[SYSPROCESSES] WHERE [DBID] 
IN 
(
SELECT 
   [DBID]
FROM 
   [Master].[dbo].[SYSDATABASES] 
WHERE 
   NAME='databaseName'
)
```

15.如何测试一个SQL查询的响应时间

```
SELECT SUBSTRING(qt.text, ( qs.statement_start_offset / 2 ) + 1,
( ( CASE qs.statement_end_offset
WHEN -1 THEN DATALENGTH(qt.text)
ELSE qs.statement_end_offset
END - qs.statement_start_offset ) / 2 ) + 1) ,
qs.execution_count ,
qs.total_worker_time as total_worker_time_in_s,
qs.last_worker_time as last_worker_time_in_ms,
(qs.total_worker_time /qs.execution_count)/1000 as avg_execution_time_ms,
qs.last_execution_time
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
ORDER BY qs.last_execution_time DESC
--这个里面的total_worker_time在不考虑网络传输的情况下，可以看为是响应时间。
--测试结果：total_worker_time=编译时间+等待时间+执行时间+返回时间
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
* [查看SQL SERVER 数据库正在执行的语句和时长等][9]
* [SQL监控脚本（适用于SQL Server 2005以上）][10]
* [SQL Server 语法收集][11]
* [SQL Server适用脚本收集一][12]
* [SQL分页存储过程（适用于SQL2005以上版本）][13]
* [用sql脚本创建sqlserver数据库范例语句][14]
* [DB - 常用SQL积累][15]
* [你可能不知道的 10 条 SQL 技巧，涨知识了！][16]
* [SQLServer 查看SQL语句的执行时间][17]
* [看懂SqlServer查询计划][18]
* [sqlserver字符串拆分(split)方法汇总][19]
* [Create a Cursor using Dynamic SQL Query][20]
* [SQL 列转行][21]
* [如何测试一个SQL查询的响应时间][22]
* [SQLServer获取临时表列名并判断指定列名是否存在][23]

[1]: http://www.cnblogs.com/sosoft/p/3535696.html
[2]: https://www.cnblogs.com/Fooo/p/3552861.html
[3]: https://blog.csdn.net/ws379374000/article/details/78499767
[4]: https://blog.csdn.net/wang_cel/article/details/50418323
[5]: https://www.cnblogs.com/NaturalSelection/p/4208937.html
[6]: https://blog.csdn.net/qq_34397273/article/details/79599964
[7]: https://ld.sogou.com/article?aid=3001586722
[8]: https://blog.csdn.net/smartsmile2012/article/details/80950906
[9]: https://blog.csdn.net/fzgjf08/article/details/54580042
[10]: https://www.cnblogs.com/seer/archive/2013/04/09/3010420.html
[11]: https://www.cnblogs.com/lollipop/archive/2012/09/12/2681542.html
[12]: https://www.cnblogs.com/songrun/archive/2013/06/08/3125940.html
[13]: https://www.cnblogs.com/kingfly/archive/2009/09/10/1564364.html
[14]: https://www.jb51.net/article/24715.htm
[15]: https://www.cnblogs.com/raysbo/archive/2008/05/26/1207475.html
[16]: https://blog.csdn.net/u011342403/article/details/78737700
[17]: https://blog.csdn.net/suxuelian/article/details/80198415
[18]: http://www.cnblogs.com/fish-li/archive/2011/06/06/2073626.html
[19]: http://www.cnblogs.com/aierong/archive/2008/11/19/sqlserver_split.html
[20]: http://www.manjuke.com/2012/11/create-cursor-using-dynamic-sql-query.html
[21]: https://blog.csdn.net/vipxiaotian/article/details/4409423
[22]: http://www.imooc.com/wenda/detail/455392
[23]: https://www.cnblogs.com/huyueping/p/10342178.html