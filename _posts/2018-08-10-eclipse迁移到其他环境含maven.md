---
layout: post
title: eclipse迁移到其他环境含maven
categories: eclipse
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
1.配置环境变量

M2_HOME=C:\download\java\apache\apache-maven-3.3.9

PATH=%M2_HOME%\bin;

CLASSPATH=.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar

JAVA_HOME=C:\download\java\jdk1.8.0_111

PATH=%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

2.修改路径

修改apache-maven-3.3.9\conf\settings.xml
<localRepository>C:/Users/01/.m2/repository</localRepository>

修改工作空间
sts-bundle\sts-3.9.1.RELEASE\configuration\.settings\org.eclipse.ui.ide.prefs
RECENT_WORKSPACES=C\:\\download\\java\\sts-bundle\\sts-3.9.1.RELEASE\\workspace

3.安装maven和更新

下载m2e绿色插件,解压后方到dropins里,构建的文件夹为dropins/m2e/plugins和features两个文件夹

更新Maven
右键项目->Maven->Update Project

```

**更新列表：**


**参考文章：**

* [【图文详细教程】maven3安装配置+eclipse离线安装maven3插件][1]
* [修改Eclipse的M2_REPO默认路径][2]



[1]: https://blog.csdn.net/victory_long/article/details/54411919
[2]: http://www.cnblogs.com/mousachi2007/p/7168906.html
