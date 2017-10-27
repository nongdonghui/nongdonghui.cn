---
layout: post
title: window远程监控centos下tomcat
categories: java
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1、服务器系统centos6.5 64位、jdk1.8.0_73（64位）、tomcat-6.0.41。

2、配置tomcat/bin/catalina.sh ,在 Execute The Requested Command 上面配置一下 如下参数：

```
JAVA_OPTS="-server -Xms1024M -Xmx1024M -Xss512k -Dcom.sun.management.jmxremote.port=1099 -Dcom.sun.management.jmxremote.rmi.port=1099 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -Djava.rmi.server.hostname=192.10.100.129"
```

3、配置jmxremote.access和jmxremote.password，（注意配置的jre路径下面的jmxremote,可以使用 ps -ef|grep java 确定一下jre的路径）

cd /opt/jdk1.8.0_65/jre/lib/management  
mv jmxremote.password.template jmxremote.password
chmod 600 jmxremote.access jmxremote.password
vi jmxremote.password

将jmxremote.password中最后两行中的注释去掉（前面为用户，后面为密码）

monitorRole 123 
controlRole 123

其中monitorRole为只拥有只读权限的角色，controlRole有更高权限。

4、将两个文件复制到tomcat的conf目录下

5、在防火墙开放1099端口

```
/sbin/iptables -I INPUT -p tcp --dport 1099 -j ACCEPT
/etc/rc.d/init.d/iptables save
service iptables restart
```

6、连接centos的jconsole服务器端，输入IP地址 port

其中,我本机还需要修改/etc/hosts,

```
将
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
其中的127地址改为本机的地址
```

7、Java VisualVM插件安装方法:

到https://visualvm.github.io/pluginscenters.html中点击相应版本的链接,然后下载相应的插件,再在VisualVM中安装即可


8、可以在抽样器页签里面开始监控,它的底部有类名过滤器进行过滤

9、使用JConsole监控并保存日志到文件中,只需要编写一个日志配置,启动时指定它即可

logging.properties file that looks something like this:

```
 handlers = java.util.logging.ConsoleHandler
 .level = INFO

 java.util.logging.ConsoleHandler.level = FINEST
 java.util.logging.ConsoleHandler.formatter = \
 		java.util.logging.SimpleFormatter

 // Use FINER or FINEST for javax.management.remote.level - FINEST is
 // very verbose...
 javax.management.level = FINEST
 javax.management.remote.level = FINER
```

启动:

```
jconsole -J-Djava.util.logging.config.file=logging.properties
```


**更新列表：**

*



**参考文章：**

* [在windows中通过jconsole监视远程linux服务器中JVM的运行状态（比如：监视Tomcat的各项运行指标）][1]
* [Java VisualVM无法更新或安装插件解决办法][2]
* [centos 使用jconsole 监控 java 虚拟机][3]
* [Java VisualVM使用手册][4]
* [Java虚拟机性能管理神器 - VisualVM（8） 查找JAVA应用程序耗时的方法函数][5]
* [Monitor Your Applications With JConsole - Part 2][6]


[1]: http://blog.csdn.net/clementad/article/details/51253110
[2]: http://blog.csdn.net/qq_36144703/article/details/76560324
[3]: http://blog.csdn.net/cj2580/article/details/72723887
[4]: http://blog.csdn.net/wzyzzu/article/details/50380511
[5]: http://blog.csdn.net/chwshuang/article/details/44203471
[6]: http://blog.csdn.net/holymonkey/article/details/6625756