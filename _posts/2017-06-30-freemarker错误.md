---
layout: post
title: freemarker错误
categories: freemarker
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.

项目结构：

```
|-- src
    `-- gen
        `-- FirstFree.java
|-- lib
    `-- freemarker.jar
|-- templates
    `-- test.ftlh
```

代码如下：

FirstFree.java

```
package gen;

import java.io.File;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;

public class FirstFree {
	public static void main(String[] args) throws Exception {
		Configuration cfg = new Configuration(Configuration.VERSION_2_3_26);
		cfg.setDirectoryForTemplateLoading(new File("templates"));
		cfg.setDefaultEncoding("UTF-8");
		cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
		cfg.setLogTemplateExceptions(false);
		
		Map root = new HashMap();
		
		root.put("user", "Big Joe");
		
		Product latest = new Product();
		latest.setUrl("products/greenmouse.html");
		latest.setName("green mouse");
		root.put("latestProduct", latest);
		
		Template temp = cfg.getTemplate("test.ftlh");
		
		Writer out = new OutputStreamWriter(System.out);
		temp.process(root, out);
	}
}

class Product {
	private String url;
	private String name;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
```

templates/test.ftlh内容如下：

```
<html>
<head>
  <title>Welcome!</title>
</head>
<body>
  <h1>Welcome ${user}!</h1>
  <p>Our latest product:
  <a href="${latestProduct.url}">${latestProduct.name}</a>!
</body>
</html>
```

错误信息如下：

```
Exception in thread "main" FreeMarker template error:
The following has evaluated to null or missing:
==> latestProduct.url  [in template "test.ftlh" at line 8, column 14]

----
Tip: It's the step after the last dot that caused this error, not those before it.
----
Tip: If the failing expression is known to be legally refer to something that's sometimes null or missing, either specify a default value like myOptionalVar!myDefault, or use <#if myOptionalVar??>when-present<#else>when-missing</#if>. (These only cover the last step of the expression; to cover the whole expression, use parenthesis: (myOptionalVar.foo)!myDefault, (myOptionalVar.foo)??
----

----
FTL stack trace ("~" means nesting-related):
	- Failed at: ${latestProduct.url}  [in template "test.ftlh" at line 8, column 12]
----

Java stack trace (for programmers):
----
freemarker.core.InvalidReferenceException: [... Exception message was already printed; see it above ...]
	at freemarker.core.InvalidReferenceException.getInstance(InvalidReferenceException.java:134)
	at freemarker.core.EvalUtil.coerceModelToTextualCommon(EvalUtil.java:465)
	at freemarker.core.EvalUtil.coerceModelToStringOrMarkup(EvalUtil.java:387)
	at freemarker.core.EvalUtil.coerceModelToStringOrMarkup(EvalUtil.java:356)
	at freemarker.core.DollarVariable.calculateInterpolatedStringOrMarkup(DollarVariable.java:96)
	at freemarker.core.DollarVariable.accept(DollarVariable.java:59)
	at freemarker.core.Environment.visit(Environment.java:326)
	at freemarker.core.Environment.visit(Environment.java:332)
	at freemarker.core.Environment.process(Environment.java:305)
	at freemarker.template.Template.process(Template.java:378)
	at gen.FirstFree.main(FirstFree.java:32)
```

解决方法：

将Product类单独放到一个类里面：

```
package gen;

public class Product {
	private String url;
	private String name;

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
```

**更新列表：**

*



**参考文章：**

* [Putting all together][1]


[1]: http://freemarker.org/docs/pgui_quickstart_all.html
