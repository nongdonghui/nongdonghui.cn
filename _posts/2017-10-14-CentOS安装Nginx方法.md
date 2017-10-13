---
layout: post
title: CentOS安装Nginx方法
categories: nginx
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
1.下载

```
cd /usr/src

wget http://nginx.org/download/nginx-1.12.1.tar.gz

tar zxvf /usr/src/nginx-1.12.1.tar.gz -C /web/server

cd /web/server/nginx-1.12.1

yum install gcc gcc-c++ automake pcre pcre-devel zlip zlib-devel openssl openssl-devel

[root@Server1 nginx-1.8.1]# ./configure  --prefix=/usr/local/nginx  --sbin-path=/usr/local/nginx/sbin/nginx --conf-path=/usr/local/nginx/conf/nginx.conf --error-log-path=/var/log/nginx/error.log  --http-log-path=/var/log/nginx/access.log  --pid-path=/var/run/nginx/nginx.pid --lock-path=/var/lock/nginx.lock  --user=nginx --group=nginx --with-http_ssl_module --with-http_stub_status_module --with-http_gzip_static_module --http-client-body-temp-path=/var/tmp/nginx/client/ --http-proxy-temp-path=/var/tmp/nginx/proxy/ --http-fastcgi-temp-path=/var/tmp/nginx/fcgi/ --http-uwsgi-temp-path=/var/tmp/nginx/uwsgi --http-scgi-temp-path=/var/tmp/nginx/scgi --with-pcre

make

make install
```

2.启动nginx 

```
/usr/local/nginx/sbin/nginx

[root@localhost nginx-1.11.2]# /usr/local/nginx/sbin/nginx
nginx: [emerg] getpwnam("nginx") failed
　
没有安装nginx用户导致的无法启动

[root@localhost nginx-1.11.2]# useradd -s /sbin/nologin -M nginx
[root@localhost nginx-1.11.2]# id nginx
　
[root@localhost nginx-1.11.2]# /usr/local/nginx/sbin/nginx
[root@localhost nginx-1.11.2]# netstat -tlunp | grep nginx
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      9709/nginx: master 

再次启动 : /usr/local/nginx/sbin/nginx 提示
nginx: [emerg] mkdir() "/var/tmp/nginx/client/" failed (2: No such file or directory)

则用管理员去mkdir 创建文件夹后再启动
mkdir nginx
cd nginx
mkdir client

查看是否启动成功
netstat -apn|grep 80

关闭nginx
/usr/local/nginx/sbin/nginx -s stop

重载nginx
/usr/local/nginx/sbin/nginx -s reload

```



**更新列表：**

*



**参考文章：**

* [CentOS 安装 Nginx服务器环境方法][1]

[1]: http://www.111cn.net/sys/CentOS/55850.htm
