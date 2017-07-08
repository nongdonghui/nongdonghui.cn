---
layout: post
title: VisualSVN Server中设置SVN提交时强制添加注释
categories: svn
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

### 需求：SVN提交代码的时候，必须要加注释

打开VisualSVN Server，右键→Properties...，选择Hooks选项，选中【Pre-commit hook】后，点击Edit，输入如下代码

```
@echo off
setlocal
set REPOS=%1
set TXN=%2
rem check that logmessage contains at least 10 characters
rem .....代表5个字符
svnlook log "%REPOS%" -t "%TXN%" | findstr "....." > nul
if %errorlevel% gtr 0 goto err
exit 0
:err
echo 上传失败！请添加注释. 注释长度至少为5个字符. Commit aborted! 1>&2
exit 1
```

当不写注释就进行提交，会进行如下提示

![Need Comments](/images/SVN_NO_Comments_Err.png)

**参考文章：**

* [svn提交时强制添加注释][1]

[1]: http://blog.csdn.net/great3779/article/details/26451477