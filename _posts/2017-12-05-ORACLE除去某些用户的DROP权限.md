---
layout: post
title: ORACLE除去某些用户的DROP权限
categories: oracle
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

触发器:

```
CREATE OR REPLACE TRIGGER "TRG_DENY_DROP_UBISP" BEFORE
DROP ON DATABASE 
BEGIN
IF (ORA_DICT_OBJ_OWNER='TEMP_ODS' OR
ORA_DICT_OBJ_OWNER='TEMP_MID' OR
ORA_DICT_OBJ_OWNER='TEMP_DW' OR
ORA_DICT_OBJ_OWNER='TEMP_REPORT' OR
ORA_DICT_OBJ_OWNER='TEMP_WEB' OR
ORA_DICT_OBJ_OWNER='TEMP_REPORT_NEW')
AND ORA_LOGIN_USER<>'TEMP_ADMIN'---排除的用户
AND ORA_DICT_OBJ_TYPE='TABLE' AND ORA_DICT_OBJ_NAME NOT LIKE '%OLD' THEN--可以让被限制的用户删除的表
RAISE_APPLICATION_ERROR(-20010,'你不能创建/删除TEMP_%用户下的任何表.');
END IF;
END TRG_DENY_DROP_UBISP;
```

注：如果要对当前用户限制所有对象的DROP操作，可将触发器中的ORA_DICT_OBJ_TYPE和ORA_DICT_OBJ_NAME的属性去掉即可。

修改后:

```
CREATE OR REPLACE TRIGGER "TRG_DENY_DROP_UBISP" BEFORE
DROP ON DATABASE
BEGIN
  IF (ORA_DICT_OBJ_OWNER = 'THINKING_BIZ' OR
     ORA_DICT_OBJ_OWNER = 'THINKING_SYS2' OR
     ORA_DICT_OBJ_OWNER = 'THINKING_DOC' OR
     ORA_DICT_OBJ_OWNER = 'THINKING_DCS') AND ORA_DICT_OBJ_TYPE = 'TABLE' THEN
    RAISE_APPLICATION_ERROR(-20010, '您不能删除本用户下的任何表.');
  END IF;
END TRG_DENY_DROP_UBISP;
```

修改后的代码只是限制用户不能drop自己的表

**更新列表：**



**参考文章：**


* [实现ORACLE如何去除某些用户的DROP权限!][1]

[1]: http://xiaoruanjian.iteye.com/blog/879083
