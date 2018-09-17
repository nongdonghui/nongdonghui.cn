---
layout: post
title: SQLServer常用语句
categories: SQLServer
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.
```
-- 给值加1位前缀0
update CM_Secondment set fPersonID='0'+fPersonID;
-- 给值去掉第1位
update CM_Secondment set fPersonID=SUBSTRING(fPersonID,2,LEN(fPersonID));


```

2.Sql的with as 的使用

```
with as语法
–针对一个别名
with tmp as (select * from tb_name)

–针对多个别名
with
   tmp as (select * from tb_name),
   tmp2 as (select * from tb_name2),
   tmp3 as (select * from tb_name3),

--相当于建了个e临时表  
with e as (select * from scott.emp e where e.empno=7499)  
select * from e;  
   
--相当于建了e、d临时表  
with  
     e as (select * from scott.emp),  
     d as (select * from scott.dept)  
select * from e, d where e.deptno = d.deptno;  


with  
    sql1 as (select to_char(a) s_name from test_tempa),  
    sql2 as (select to_char(b) s_name from test_tempb where not exists (select s_name from sql1 where rownum=1))  
select * from sql1  
union all  
select * from sql2  
union all  
select 'no records' from dual  
       where not exists (select s_name from sql1 where rownum=1)  
       and not exists (select s_name from sql2 where rownum=1); 
```

3.重新创建主键

```
create table abcd
(
  a char(10) not null,
  b char(10) not null primary key(a,b),
  c char(10) null,
  d char(10) null
)

 

一个存在的表 abcd ,主键为 a+b ,  现在想把 a+b+c 三列修改为主键

 

 1.   删除主键：

Declare @Pk varChar(100);

Select @Pk=Name from sysobjects where Parent_Obj=OBJECT_ID('abcd') and xtype='PK';

if @Pk is not null

begin

     exec('Alter table abcd Drop '+ @Pk)  --删除原主键

 end

 

2. 把所有主键设为不能为空

alter table abcd alter column c char(10) not null

  

3.  重建主键：

ALTER Table abcd ADD CONSTRAINT pk_abcd   PRIMARY KEY (a, b, c )
```

4.查询占位符

```
select * from 表名
where 联系电话 like '[1-3]%' --------查电话是1-3开头的人
--------like是像这些条件的语句，能用通配符：%、_、[]、[^]
--------意思分别代表：所有字符、一个字符、一位上可取值、一位上不可取值

select * from 表名
where 姓名 like '[e[]%'
or 姓名 like '%e]'
escape 'e' ------------显示以‘[’开头或以‘]’结尾的所有数据，中间有不显示
----------escape ''是指定通配符
```

5.连接表更新

```
For Oracle:
update ipop_worktype_loader wl set wl.status=0
where  exists (select 1 from ipop_worktype_lkp w where  wl.worktype_id = w.worktype_id and w.application_Id=10 and wl.status=1)
 
For MS SQL Server:
update  wl  set wl.status=0  from ipop_worktype_lkp w,ipop_worktype_loader wl
where wl.worktype_id = w.worktype_id and w.application_Id=10 and wl.status=1
```

6.sqlserver数据库中随机生成N位的随机数

```
select RIGHT(100000000 + CONVERT(bigint, ABS(CHECKSUM(NEWID()))), N);
```

7.sql 触发器 if条件判断

```
if integral>50 and integral<200
begin
update customer
set lev=1
end

else 
begin

end
```

**更新列表：**

*



**参考文章：**

* [Sql的with as 的使用][1]
* [Sql Server删除主键和重建主键][2]
* [sql server中sql语句][3]
* [Oracle和SQL Server连接表的更新操作Update SQL 语句][4]
* [sqlserver数据库中随机生成N位的随机数][5]
* [sql 触发器 if条件判断][6]
* [SQLServer触发器创建、删除、修改、查看][7]

[1]: https://blog.csdn.net/turejackon/article/details/76607492
[2]: https://blog.csdn.net/bobwu/article/details/5715529
[3]: https://zhidao.baidu.com/question/257951371
[4]: http://www.cnblogs.com/ycxyyzw/archive/2012/03/09/2387668.html
[5]: https://blog.csdn.net/u013628196/article/details/44778099
[6]: http://www.cnblogs.com/activities/archive/2012/06/06/2537605.html
[7]: https://blog.csdn.net/fwj380891124/article/details/7016328