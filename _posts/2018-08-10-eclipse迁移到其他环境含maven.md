---
layout: post
title: eclipse迁移到其他环境含maven
categories: eclipse
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```

M2_HOME=C:\download\java\apache\apache-maven-3.3.9

PATH=%M2_HOME%\bin;

CLASSPATH=.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar

JAVA_HOME=C:\download\java\jdk1.8.0_111

PATH=%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

修改apache-maven-3.3.9\conf\settings.xml
<localRepository>C:/Users/01/.m2/repository</localRepository>

修改工作空间
sts-bundle\sts-3.9.1.RELEASE\configuration\.settings\org.eclipse.ui.ide.prefs
RECENT_WORKSPACES=C\:\\download\\java\\sts-bundle\\sts-3.9.1.RELEASE\\workspace

更新Maven
右键项目->Maven->Update Project

```

**更新列表：**


**参考文章：**

* [][1]
* [][2]



[1]: 
[2]: 
