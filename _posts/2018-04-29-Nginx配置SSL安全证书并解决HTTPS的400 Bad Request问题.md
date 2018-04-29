---
layout: post
title: Nginx配置SSL安全证书并解决HTTPS的400 Bad Request问题
categories: nginx
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

windows系统上:

参考:[Command-line parameters][3]

cd进入nginx.exe,start nginx,如果没有启动成功,说明配置文件有问题,可以使用nginx -t校验

启用访问日志:access_log   logs/site.log;

ssl配置参考:[Configuring HTTPS servers][2]

以下是nginx.conf自带的配置模版

```
# HTTPS server
#
#server {
#    listen       443 ssl;
#    server_name  localhost;

#    ssl_certificate      cert.pem;
#    ssl_certificate_key  cert.key;

#    ssl_session_cache    shared:SSL:1m;
#    ssl_session_timeout  5m;

#    ssl_ciphers  HIGH:!aNULL:!MD5;
#    ssl_prefer_server_ciphers  on;

#    location / {
#        root   html;
#        index  index.html index.htm;
#    }
#}
```

按照这个配置,将注释去掉,启动时(start nginx)会报错误:

```
shared zone "xxx" has no equal addresses: 02B40000 vs 02B60000 
```

参考:[windows 下 shared zone xxx has no equal addresses][1]

是因为 Nginx 缓存模块或其他使用共享缓存的模块不能在Windows Vista及以上的window上运行 

最后把ssl相关的都去掉,加上ssl on;即可




**更新列表：**



**参考文章：**

* [windows 下 shared zone xxx has no equal addresses][1]
* [Configuring HTTPS servers][2]
* [Command-line parameters][3]
* [http请求被转成https请求并报400错误 #854][4]

[1]: http://m635674608.iteye.com/blog/2341348
[2]: http://nginx.org/en/docs/http/configuring_https_servers.html
[3]: http://nginx.org/en/docs/switches.html
[4]: https://github.com/alibaba/tengine/issues/854