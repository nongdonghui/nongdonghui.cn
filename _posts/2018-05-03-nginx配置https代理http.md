---
layout: post
title: nginx配置https代理http
categories: nginx
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
http {
	upstream app_server{
	    ip_hash;
	    server 10.177.196.120:8080
	}

	server {
	    listen 8080;
	    server_name localhost;
	    location = / {
		rewrite ^/ http://$host:$server_port/bsys;
	    }
	    location / {
		proxy_pass http://app_server;
		proxy_redirect off;
		proxy_set_header Host $host:$server_port;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
		client_max_body_size 10m;
		client_body_buffer_size 128k;
		proxy_connect_timeout 90;
		proxy_send_timeout 90;
		proxy_read_timeout 90;
		proxy_buffer_size 4k;
		proxy_buffers 4 32k;
		proxy_busy_buffers_size 64k;
		proxy_temp_file_write_size 64k;
	    }
	}

        server {
	    listen 8081 ssl;
	    server_name localhost;
	    
	    ssl_certificate     server.pem;
            ssl_certificate_key server.key;

	    ssl on;
	    ssl_session_timeout 5m;
	    ssl_ciphers         HIGH:!aNULL:!MD5;
	    ssl_prefer_server_ciphers         on;

	    location = / {
		REWRITE ^/ HTTPS://$HOST:$SERVER_PORT/BSYS;
	    }

	    location ^~ /bsys {
		proxy_pass http://app_server/bsys;
	    }

	    location / {
		proxy_pass http://app_server;
		proxy_redirect off;
		proxy_set_header Host $host:$server_port;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
		client_max_body_size 10m;
		client_body_buffer_size 128k;
		proxy_connect_timeout 90;
		proxy_send_timeout 90;
		proxy_read_timeout 90;
		proxy_buffer_size 4k;
		proxy_buffers 4 32k;
		proxy_busy_buffers_size 64k;
		proxy_temp_file_write_size 64k;
	    }
	}

}

这样配置可以访问http和https
http://192.168.1.188:8080
https://192.168.1.188:8081



如果想访问http://192.168.1.188:8080用https代理的话可以如下配置:
location = / {
    rewrite ^/ https://$host:8081/bsys;
}

这样当访问http://192.168.1.188:8080就会跳转到https://192.168.1.188:8081

```




**更新列表：**



**参考文章：**

* [Configuring HTTPS servers][1]
* [nginx配置location总结及rewrite规则写法[2]
* [][3]
* [][4]

[1]: http://nginx.org/en/docs/http/configuring_https_servers.html
[2]: https://blog.csdn.net/z69183787/article/details/50524124
[3]: 
[4]: 