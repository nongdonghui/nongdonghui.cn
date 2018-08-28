---
layout: post
title: SQLServer创建存储过程
categories: SQLServer
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.
```
CREATE PROCEDURE [dbo].[Test_Get_PersonInfo] 
	@PSNCODE nvarchar(100)='', 
	@NESTLECODE nvarchar(100)='', 
	@PSNNAME nvarchar(100)='',
	@GZ nvarchar(100)='',
	@INDATE_B nvarchar(100)='1900-01-01',
	@INDATE_E nvarchar(100)='1900-01-01',
	@PSNCLASSCODE nvarchar(100)='',
	@DEPTCODE nvarchar(100)='',
	@DEPTNAME nvarchar(100)='',
	@JOBCODE nvarchar(100)='',
	@JOBNAME nvarchar(100)='',
	@STATUS varchar(1)=''
AS
BEGIN	
	declare @cdn nvarchar(1000) = ' where 1=1';

	if @PSNCODE != ''	
		set @cdn = @cdn + ' and PSNCODE=''' + @PSNCODE + '''';
	if @NESTLECODE != ''	
		set @cdn = @cdn + ' and NESTLECODE=''' + @NESTLECODE + '''';
	if @PSNNAME != ''	
		set @cdn = @cdn + ' and PSNNAME like ''%' + @PSNNAME + '%''';
	if @GZ != ''	
		set @cdn = @cdn + ' and GZCODE like ''%' + @GZ + '%''';
	if @INDATE_B != ''	
		set @cdn = @cdn + ' and INDATE >= ''' + @INDATE_B + '''';
	if @INDATE_E != ''	
		set @cdn = @cdn + ' and INDATE <= ''' + @INDATE_E + '''';
	if @PSNCLASSCODE != ''	
		set @cdn = @cdn + ' and PSNCLASSCODE = ''' + @PSNCLASSCODE + '''';
	if @DEPTCODE != ''	
		set @cdn = @cdn + ' and DEPTCODE = ''' + @DEPTCODE + '''';
	if @DEPTNAME != ''	
		set @cdn = @cdn + ' and DEPTNAME like ''%' + @DEPTNAME + '%''';
	if @JOBCODE != ''	
		set @cdn = @cdn + ' and JOBCODE = ''' + @JOBCODE + '''';
	if @JOBNAME != ''	
		set @cdn = @cdn + ' and JOBNAME like ''%' + @JOBNAME + '%''';
	if @STATUS != ''
		set @cdn = @cdn + ' and STATUS = ''' + @STATUS + '''';
	set @cdn = 'SELECT *,GZCODE as GZ,GZNAME as GZN from SysPerson' + @cdn;
	print @cdn;
	exec sp_executesql @cdn;
END

```

**更新列表：**

*



**参考文章：**

* [Java调用存储过程参数默认值问题][1]
* [][2]
* [][3]
* [][4]

[1]: http://ducaijun.iteye.com/blog/1955381
[2]: 
[3]: 
[4]: 

