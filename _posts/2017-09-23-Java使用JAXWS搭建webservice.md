---
layout: post
title: Java使用jaxws搭建webservice
categories: jaxws
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
* 新建maven project,选择maven-archetype-webapp,Group Id:com,Artifact Id:company_ws,Version:默认值,Package:com.company.ws  
  补齐4个文件夹:src/main/java,src/main/resources,src/test/java,src/test/resources,然后在Java Build Path里面的Source设置这几个文件夹为源文件(在Source里Add Folder选择),  
  在Order And Export里排序源文件夹
* 在项目属性里面的Project Facets里面Convert to faceted form...,选择Dynamic Web Module,并且点击Further configuration available...设置Context directory:src/main/webapp,OK
* 把Servers透视图打开,新建一个Server,这里使用tomcat7,Server Locations为Use Tomcat installation(takes control of Tomcat installation)  
  Server path: tomcat根目录
  Deploy path: webapps
  Server Options: 只选择Modules auto reload by default
* 把需要的包都放在webapp/WEB-INF/lib里面,然后在Java Build Path里添加jar引用(在Java Build Path的Libraries里的Web App Libraries有的就不用再引用)
* 新建包com.company.ws.hello,新建IHelloWorld接口,代码如下:

```java
package com.company.ws.hello;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

@WebService
public interface IHelloWorld {
    @WebMethod
    @WebResult(name = "returnResult")
    public String greet(@WebParam(name = "name", mode = WebParam.Mode.IN) String name,
            @WebParam(name = "word", mode = WebParam.Mode.IN) String word);
}

```

实现代码

```
package com.company.ws.hello;

import javax.jws.WebService;

@WebService(endpointInterface = "com.company.ws.hello.IHelloWorld")
public class HelloWorldImpl implements IHelloWorld {

    @Override
    public String greet(String name, String word) {
        return "Hello: " + name + "," + word;
    }

}
```

* 在WEB-INF下新建文件sun-jaxws.xml,内容为

```xml
<?xml version="1.0" encoding="UTF-8"?>
<endpoints xmlns="http://java.sun.com/xml/ns/jax-ws/ri/runtime" version="2.0">
  <endpoint
     name="HelloWorld"
     implementation="com.company.ws.hello.HelloWorldImpl"
     url-pattern="/HelloWorld"/>
</endpoints>
```

* 在web.xml里设置(兼容多个endpoint配置)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app
     xmlns="http://java.sun.com/xml/ns/j2ee"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee
                         http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
     version="2.4">
     <display-name>company_ws</display-name>
   <listener>
     <listener-class>
        com.sun.xml.ws.transport.http.servlet.WSServletContextListener
     </listener-class>
   </listener>
   <servlet>
      <servlet-name>company_ws</servlet-name>
      <servlet-class>
        com.sun.xml.ws.transport.http.servlet.WSServlet
      </servlet-class>
   </servlet>
   <servlet-mapping>
     <servlet-name>company_ws</servlet-name>
     <url-pattern>/</url-pattern>
   </servlet-mapping>
</web-app>
```

* 进入目录

```
cd /d C:\download\eclipse\workspace\company_ws
```

* 生成jaxws相应的java文件

```
wsgen -s src/main/java -d target -cp target/classes com.company.ws.hello.HelloWorldImpl
```

此时,会在com.company.ws.hello目录下生成一个jaxws目录,它下面有Greet.java和GreetResponse.java

* 启动服务器

* 打开http://127.0.0.1:8080/company_ws/HelloWorld看是否成功,加上?wsdl查看定义结构

* 进入测试目录

```
cd /d C:\download\eclipse\workspace\company_ws\src\test\java
```

* 生成测试代码

```
wsimport -s . -p com.company.ws.hello.client -encoding utf-8 http://127.0.0.1:8080/company_ws/HelloWorld?wsdl
```

* 在com.company.ws.hello.client里生成一个Test类

```
package com.company.ws.hello.client;

public class Test {
    public static void main(String[] args) {
        HelloWorldImplService helloWorldImplService = new HelloWorldImplService();
        IHelloWorld helloWorldImplPort = helloWorldImplService.getHelloWorldImplPort();
        String greet = helloWorldImplPort.greet("ndh", "最近如何");
        System.out.println(greet);
    }
}
```

* 直接右键,以java application形式运行

* 控制台打印:

```
Hello: ndh,最近如何
```

* maven配置将jar包在打包的时候,包含到项目中

```
<build>
    <plugins>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <configuration>
              <source>1.6</source>
              <target>1.6</target>
              <encoding>UTF-8</encoding>
              <compilerArguments>
               <extdirs>src\main\webapp\WEB-INF\lib</extdirs>
             </compilerArguments>
          </configuration>
        </plugin>
    </plugins>
</build>
```

* maven 打包 goals = install

**更新列表：**

*



**参考文章：**

* [eclipse 创建maven 项目 动态web工程完整示例][1]
* [JAX-WS multiple endpoints in sun-jaxws.xml][2]
* [使用JaxWs开发Web Service][3]
* [使用JAX-WS(JWS)发布WebService][4]
* [使用wsimport生成webservice客户端代码][5]
* [maven引入放在了WEB-INF/lib目录下的jar包][6]
* [使用jaxws建立webservice客户端并实现soap消息的handler验证示例][7]
* [jax-ws不支持 map做参数么][8]


[1]: http://www.cnblogs.com/noteless/p/5213075.html
[2]: https://stackoverflow.com/questions/6172463/jax-ws-multiple-endpoints-in-sun-jaxws-xml
[3]: http://blog.csdn.net/zbw18297786698/article/details/51834450
[4]: http://www.cnblogs.com/adolfmc/p/4383091.html
[5]: http://blog.sina.com.cn/s/blog_a283174d0102va96.html
[6]: http://blog.csdn.net/hhj724/article/details/53289241
[7]: http://m.jb51.net/show/47920
[8]: https://zhidao.baidu.com/question/2142510044955168388