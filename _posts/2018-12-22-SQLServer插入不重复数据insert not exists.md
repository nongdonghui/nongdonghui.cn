---
layout: post
title: SQLServer插入不重复数据insert not exists
categories: SQLServer
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.存储过程格式规范例子

```
INSERT INTO account  
(id, name, gender)  
SELECT #{id}, #{name} , #{gender}   
FROM dual
WHERE not exists (select * from account  
where name=#{name}
```

注意:dual表必须值有且只有一行记录,SQLServer需要新建这个表,否则会提交重复数据,且每次提交只能提交一行数据,在事务里提交的话会有重复插入主键的SQL异常

```
CREATE TABLE [dbo].[dual](
	[id] [varchar](50) NOT NULL,
 CONSTRAINT [PK_dual] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

insert into dual(id) values(NEWID())

go
```

**更新列表：**

*



**参考文章：**

* [insert not exists的问题][1]
* [][2]
* [][3]
* [][4]

[1]: https://blog.csdn.net/Null_hc/article/details/73236409
[2]: 
[3]: 
[4]: 

