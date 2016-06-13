---
layout: post
title: MyEclipse启动失败，卡在正在装入org.eclipse.team.ui不动解决方法
categories: myeclipse
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

尝试方法：

1.把工作空间的.metadata文件夹下的.lock和.log文件都删了，不能成功启动

2.使用-clean命令启动，不能启动成功

3.把org.eclipse.team.ui删除再启动，不能启动成功

4.把org.eclipse.core.resources重命名为org.eclipse.core.resources**_old**，成功启动，但是你会发现里面没有项目，因为项目信息是保存在`.metadata\.plugins\org.eclipse.core.resources\.projects`这个目录下的，那么我们就把他们还原，先关闭MyEclipse，把新生成的org.eclipse.core.resources删掉，还原org.eclipse.core.resources**_old**为org.eclipse.core.resources，再重启即可

**更新列表：**

*



**参考文章：**

* [eclipse起动无响应，停留在Loading workbench状态][1]


[1]: http://tech.chachabei.com/java/279540.html
