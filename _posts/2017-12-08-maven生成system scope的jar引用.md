---
layout: post
title: maven生成system scope的jar引用
categories: maven
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
import java.io.File;

public class GenerateMavenSystemDependenciesFromLib {
	public static void main(String[] args) {
		findFiles(".../src/main/webapp/WEB-INF/lib");
	}

	public static void findFiles(String baseDirName) {
		File baseDir = new File(baseDirName); // 创建一个File对象
		if (!baseDir.exists() || !baseDir.isDirectory()) { // 判断目录是否存在
			System.out.println("文件查找失败：" + baseDirName + "不是一个目录！");
		}
		StringBuilder tempName = new StringBuilder();
		File tempFile;
		File[] files = baseDir.listFiles();
		for (int i = 0; i < files.length; i++) {
			tempFile = files[i];
			if (tempFile.isDirectory()) {
				findFiles(tempFile.getAbsolutePath());
			} else if (tempFile.isFile()) {
				tempName.setLength(0);
				
				tempName.append("<dependency>");
				tempName.append("    <groupId>").append(tempFile.getName().substring(0, tempFile.getName().lastIndexOf("."))).append("</groupId>");
				tempName.append("    <artifactId>").append(tempFile.getName().substring(0, tempFile.getName().lastIndexOf("."))).append("</artifactId>");
				tempName.append("    <version>1.0.0</version>");
				tempName.append("    <scope>system</scope>");
				tempName.append("    <systemPath>${project.basedir}/src/main/webapp/WEB-INF/lib/").append(tempFile.getName()).append("</systemPath>");
				tempName.append("</dependency>");
				
				System.out.println(tempName.toString());
			}
		}
	}

}
```


**更新列表：**



**参考文章：**

* [-Dmaven.multiModuleProjectDirectory system property is not set][1]


[1]: http://blog.csdn.net/xujiangdong1992/article/details/65443450?locationNum=15&fps=1
