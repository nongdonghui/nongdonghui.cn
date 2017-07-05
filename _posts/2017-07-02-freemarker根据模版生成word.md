---
layout: post
title: freemarker根据模版生成word
categories: freemarker
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.准备一个word文件resume.docx，里面有如下字段：

```
${name}
${sex}
${age}
${class}
${company}
${school}
${address}
${id}
```

然后将它另存为xml文档resume.xml

2.新建java项目，使用freemarker2.3.6.jar版本，引入java构建路径

3.代码实现

WordHandler.java

```
package com.freemarkes.word;

import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class WordHandler {
	private Configuration cfg = null;

	public WordHandler() {
		cfg = new Configuration(Configuration.VERSION_2_3_26);
		cfg.setDefaultEncoding("UTF-8");
	}

	private Template getTemplate(String templatePath, String templateName) throws IOException {
		cfg.setDirectoryForTemplateLoading(new File(templatePath));

		Template t = cfg.getTemplate(templateName);
		return t;
	}

	public void write(String templatePath, String templateName, Map<Object, Object> dataMap, Writer out)
			throws Exception {
		try {
			Template t = getTemplate(templatePath, templateName);
			t.process(dataMap, out);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		} finally {
			out.close();
		}
	}
}
```

Main.java

```
package com.freemarkes.word;

import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

public class Main {
	
	public static void main(String[] args) throws Exception {
		Map<Object, Object> map = getMap();
		WordHandler handler = new WordHandler();
		Writer out = new OutputStreamWriter(new FileOutputStream("D:\\简历.doc"), "UTF-8");
		handler.write("templates", "resume.xml", map, out);
	}

	public static Map<Object, Object> getMap() {
		Map<Object, Object> map = new HashMap<Object, Object>();
		map.put("name", "Andy");
		map.put("sex", "男");
		map.put("age", "22");
		map.put("class", "软件技术");
		map.put("company", "北京科技");
		map.put("school", "广西农垦");
		map.put("address", "广西南宁");
		map.put("id", "06631029");
		return map;
	}

}
```

**更新列表：**

*



**参考文章：**

* [Editor and IDE plugins][1]
* [JBoss Tools][2]



[1]: http://freemarker.org/editors.html
[2]: http://tools.jboss.org/
