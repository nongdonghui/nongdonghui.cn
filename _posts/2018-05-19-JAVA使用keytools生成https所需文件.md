---
layout: post
title: JAVA使用keytools生成https所需文件
categories: java
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
D:\java\jre1.8\bin>keytool -genkeypair -alias keystore -keyalg RSA -validity 3650 -key store keystore.jks
D:\java\jre1.8\bin>keytool -list -v -keystore keystore.jks
D:\java\jre1.8\bin>keytool -export -alias keystore -keystore keystore.jks -rfc -file keystore.cer
D:\java\jre1.8\bin>keytool -list
D:\java\jre1.8\bin>keytool -import -trustcacerts -alias keystore -keystore "D:\java\jre1.8\lib\security\cacerts" -file D:\java\jre1.8\bin\keystore.cer -storepass changeit
```

注意最后一步的密码必须是changeit,否则提示
错误提示：sun.security.validator.ValidatorException: PKIX path building failed


**更新列表：**

*



**参考文章：**

* [错误提示：sun.security.validator.ValidatorException: PKIX path building failed][1]


[1]: http://blog.51cto.com/helpdesk/1046442
