---
layout: post
title: nginx配置http和https代理
categories: nginx
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
http {
	upstream app_server.com {
	    ip_hash;
	    server 10.177.196.120:8080;
	    server 10.177.196.121:8080;
	}

	server {
	    listen 443 ssl;
	    server_name app_server;
	    
	    ssl_certificate     server.pem;
	    ssl_certificate_key server.key;

	    ssl on;
	    ssl_session_timeout 5m;
	    ssl_ciphers         HIGH:!aNULL:!MD5;
	    ssl_prefer_server_ciphers         on;

	    location / {
		    proxy_pass http://app_server.com;
	    }
	}

	server {
	    listen 80;
	    server_name app_server;
	    location = / {
		    rewrite ^/ https://$host:443;
	    }	    
	}
}
```

这样即可访问
http://192.168.1.188   默认90端口可省略
https://192.168.1.188  默认443端口可省略

* tomcat配置说明

```
1.
<Connector port="8080" URIEncoding="utf-8" maxHttpHeaderSize="8192" compression="on"
               maxThreads="150" minSpareThreads="3" maxSpareThreads="15"
               enableLookups="false" redirectPort="443" acceptCount="300"
               compressionMinSize="10" connectionTimeout="30000" disableUploadTimeout="true" 
               compressableMimeType="text/html,text/xml,text/css,text/javascript,application/x-javascript,application/javascript,application/xml,application/json">	
</Connector>

2.
<Connector port="443" protocol="HTTP/1.1" SSLEnabled="true"
     maxThreads="150" scheme="https" secure="true"
     clientAuth="false" sslProtocol="TLS"
     keystoreFile="D:\xfj\BeX5_V3.7\java\jre1.8\bin\keystore.jks" keystorePass="111111" />
```

其中第1段中redirectPort="443"需要和第2段的port对应,redirectPort是在资源请求https的时候,会跳转到该端口中,即第2段中进行加密访问资源,
这样可以同时用8080和443访问,http://localhost:8080和https://localhost:443(443可省略)

* location通配符说明

```
location / {}    : 通用匹配,任何请求都会匹配到
location = / {}  : 精确匹配,即根路径
location ^~ /static/ {} : 匹配以/static/开头的路径
rewrite指令
  语法：rewrite regex replacement [flag];  flag标志可以停止继续处理

  ^ : 匹配输入字符串的起始位置
  regex部分是 ^/(.*) ，这是一个正则表达式，匹配完整的域名和后面的路径地址
```

多个location配置的情况下匹配顺序为（仅供参考）:

首先匹配 =，其次匹配^~, 其次是按文件中顺序的正则匹配，最后是交给 / 通用匹配。当有匹配成功时候，停止匹配

**更新列表：**



**参考文章：**

* [Nginx 路径匹配规则,通配符][1]
* [Windows系统下查看端口的占用情况][2]
* [Windows下80端口被进程System占用的解决方法][3]
* [Windows平台下80端口被System占用解决办法][4]
* [Nginx rewrite模块深入浅出详解][5]

[1]: https://blog.csdn.net/jy02149522/article/details/79066574
[2]: https://jingyan.baidu.com/article/15622f2432b952fdfcbea501.html
[3]: https://www.cnblogs.com/firstdream/p/8057646.html
[4]: https://jingyan.baidu.com/article/08b6a591b23ebe14a8092231.html
[5]: http://www.cnblogs.com/beyang/p/7832460.html