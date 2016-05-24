---
layout: post
title: Jersey和SpringMVC返回对象类型
categories: java
lastUpdated: 5.24
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

SpringMVC的rest api返回类型是自己实现的`ResponseEntity`，它只有一个`HttpStatus`类型的属性`statusCode`，然后继承了`HttpEntity`，我们查看里面的主要代码

```java
public static final HttpEntity EMPTY = new HttpEntity();
	
private final HttpHeaders headers;

private final T body;

@Override
public String toString() {
  StringBuilder builder = new StringBuilder("<");
  if (body != null) {
    builder.append(body);
    if (headers != null) {
      builder.append(',');
    }
  }
  if (headers != null) {
    builder.append(headers);
  }
  builder.append('>');
  return builder.toString();
}
```

这里告诉我们ResponseEntity主要有4个属性(statusCode,EMPTY,headers,body)，假如我们有以下的一个方法

```java
@Path("/handle")
public ResponseEntity<String> handle() {
  HttpHeaders responseHeaders = new HttpHeaders();
  responseHeaders.set("MyResponseHeader", "MyValue");
  return new ResponseEntity<String>("Hello World", responseHeaders, HttpStatus.CREATED);
}
```

@Path是用jersey的形式调用，它会以这样的数据返回

```yaml
response: Resource
  $promise: Promise
  $resolved: true
  body: "Hello World"
  headers:Object
    MyResponseHeader: Array[1]
      0: "MyValue"
      length: 1
  statusCode: "OK"
  __proto__: Object
```

但是这样会多一层解析：response.body，所以要么用SpringMVC形式，如下面这样用@RequestMapping代替@Path

```java
@RequestMapping("/handle")
public ResponseEntity<String> handle() {
  HttpHeaders responseHeaders = new HttpHeaders();
  responseHeaders.set("MyResponseHeader", "MyValue");
  return new ResponseEntity<String>("Hello World", responseHeaders, HttpStatus.CREATED);
}
```

那么就可以直接@scope.items = response，天然response就是返回的数据，不包含其他的头文件和状态码等信息

要么可以用标准的jax-rs提供的Response对象返回也可以返回不包含其他的头文件和状态码等信息的response对象

```java
return Response.ok().header("headerName", headerValue).entity(entity).build();
// or
return Response.ok(entity).header("headerName", headerValue).build();
```

好奇它的链式调用是怎么实现的，F3在ok()上

```java
public static ResponseBuilder ok() {
  return status(Status.OK);
}
public static ResponseBuilder status(Status status) {
  return status((StatusType) status);
}
public static ResponseBuilder status(StatusType status) {
  return ResponseBuilder.newInstance().status(status);
}
```

是的，它返回了一个ResponseBuilder

再F3在header("headerName", headerValue)上

```java
public abstract ResponseBuilder header(String name, Object value);
```

它也是返回ResponseBuilder，说明就是返回同一个对象一直给它加任务，保证可以一直链接下去

那么如果用angularjs的$resource怎么获取它的headers呢，话不多说，直接上代码

```javascript
var app = angular.module('TestApp', ['ngResource']);

app.factory('Man', function($resource) {
  return $resource('/api/man/:id');
});

app.controller('TestCtrl', function($scope, Man) {
  // Get specific Man
  Man.get({id: 1}, function(data, headersGetter) {
    $scope.man = data;
    var contentType = headersGetter('content-type');
    console.log('content-type:' + contentType);
  });  
});

// or
app.factory('Man', function($resource) {
    return $resource('/api/man/:id', null, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(data, headersGetter) {
                var items = angular.fromJson(data);
                console.log(items);
                return items;
            }
        }
    });
});
```

是的，就是用then里function的第二个参数，第一个参数是返回的数据

**更新列表：**

* 2016-5-24
* spring-web从4.1.0开始，ResponseEntity也新增了链式调用写法兼容java8语法，而且新增了RequestEntity类

    ```java
    package org.springframework.http;

    import java.net.URI;
    import java.util.Arrays;
    import java.util.HashSet;
    import org.springframework.util.MultiValueMap;
    import org.springframework.util.ObjectUtils;

    public class ResponseEntity<T> extends HttpEntity<T>
    {
      private final HttpStatus statusCode;

      public ResponseEntity(HttpStatus statusCode)
      {
        this.statusCode = statusCode;
      }

      public ResponseEntity(T body, HttpStatus statusCode)
      {
        super(body);
        this.statusCode = statusCode;
      }

      public ResponseEntity(MultiValueMap<String, String> headers, HttpStatus statusCode)
      {
        super(headers);
        this.statusCode = statusCode;
      }

      public ResponseEntity(T body, MultiValueMap<String, String> headers, HttpStatus statusCode)
      {
        super(body, headers);
        this.statusCode = statusCode;
      }

      public HttpStatus getStatusCode()
      {
        return this.statusCode;
      }

      public boolean equals(Object other)
      {
        if (this == other) {
          return true;
        }
        if ((!(other instanceof ResponseEntity)) || (!super.equals(other))) {
          return false;
        }
        ResponseEntity otherEntity = (ResponseEntity)other;
        return ObjectUtils.nullSafeEquals(this.statusCode, otherEntity.statusCode);
      }

      public int hashCode()
      {
        return super.hashCode() * 29 + ObjectUtils.nullSafeHashCode(this.statusCode);
      }

      public String toString()
      {
        StringBuilder builder = new StringBuilder("<");
        builder.append(this.statusCode.toString());
        builder.append(' ');
        builder.append(this.statusCode.getReasonPhrase());
        builder.append(',');
        Object body = getBody();
        HttpHeaders headers = getHeaders();
        if (body != null) {
          builder.append(body);
          if (headers != null) {
            builder.append(',');
          }
        }
        if (headers != null) {
          builder.append(headers);
        }
        builder.append('>');
        return builder.toString();
      }

      public static BodyBuilder status(HttpStatus status)
      {
        return new DefaultBuilder(status);
      }

      public static BodyBuilder status(int status)
      {
        return status(HttpStatus.valueOf(status));
      }

      public static BodyBuilder ok()
      {
        return status(HttpStatus.OK);
      }

      public static <T> ResponseEntity<T> ok(T body)
      {
        BodyBuilder builder = ok();
        return builder.body(body);
      }

      public static BodyBuilder created(URI location)
      {
        BodyBuilder builder = status(HttpStatus.CREATED);
        return (BodyBuilder)builder.location(location);
      }

      public static BodyBuilder accepted()
      {
        return status(HttpStatus.ACCEPTED);
      }

      public static HeadersBuilder<?> noContent()
      {
        return status(HttpStatus.NO_CONTENT);
      }

      public static BodyBuilder badRequest()
      {
        return status(HttpStatus.BAD_REQUEST);
      }

      public static HeadersBuilder<?> notFound()
      {
        return status(HttpStatus.NOT_FOUND);
      }

      private static class DefaultBuilder
        implements ResponseEntity.BodyBuilder
      {
        private final HttpStatus status;
        private final HttpHeaders headers = new HttpHeaders();

        public DefaultBuilder(HttpStatus status) {
          this.status = status;
        }

        public ResponseEntity.BodyBuilder header(String headerName, String[] headerValues)
        {
          for (String headerValue : headerValues) {
            this.headers.add(headerName, headerValue);
          }
          return this;
        }

        public ResponseEntity.BodyBuilder allow(HttpMethod[] allowedMethods)
        {
          this.headers.setAllow(new HashSet(Arrays.asList(allowedMethods)));
          return this;
        }

        public ResponseEntity.BodyBuilder contentLength(long contentLength)
        {
          this.headers.setContentLength(contentLength);
          return this;
        }

        public ResponseEntity.BodyBuilder contentType(MediaType contentType)
        {
          this.headers.setContentType(contentType);
          return this;
        }

        public ResponseEntity.BodyBuilder eTag(String eTag)
        {
          this.headers.setETag(eTag);
          return this;
        }

        public ResponseEntity.BodyBuilder lastModified(long date)
        {
          this.headers.setLastModified(date);
          return this;
        }

        public ResponseEntity.BodyBuilder location(URI location)
        {
          this.headers.setLocation(location);
          return this;
        }

        public ResponseEntity<Void> build()
        {
          return new ResponseEntity(null, this.headers, this.status);
        }

        public <T> ResponseEntity<T> body(T body)
        {
          return new ResponseEntity(body, this.headers, this.status);
        }
      }

      public static abstract interface BodyBuilder extends ResponseEntity.HeadersBuilder<BodyBuilder>
      {
        public abstract BodyBuilder contentLength(long paramLong);

        public abstract BodyBuilder contentType(MediaType paramMediaType);

        public abstract <T> ResponseEntity<T> body(T paramT);
      }

      public static abstract interface HeadersBuilder<B extends HeadersBuilder<B>>
      {
        public abstract B header(String paramString, String[] paramArrayOfString);

        public abstract B allow(HttpMethod[] paramArrayOfHttpMethod);

        public abstract B eTag(String paramString);

        public abstract B lastModified(long paramLong);

        public abstract B location(URI paramURI);

        public abstract ResponseEntity<Void> build();
      }
    }
    ```

**参考文章：**

* [Post JSON to spring REST webservice][1]
* [Building Responses][2]
* [Using Entity Providers to Map HTTP Response and Request Entity Bodies][3]
* [How to access response headers using $resource in Angular?][4]
* [201 CREATED WITH ANGULAR RESOURCE][5]
* [AngularJS $http and $resource][6]

[1]: http://www.leveluplunch.com/java/tutorials/014-post-json-to-spring-rest-webservice/
[2]: https://jersey.java.net/documentation/latest/representations.html#d0e6628
[3]: http://docs.oracle.com/javaee/6/tutorial/doc/gilik.html#gipze
[4]: http://stackoverflow.com/questions/28405862/how-to-access-response-headers-using-resource-in-angular
[5]: http://www.trajano.net/2013/05/201-created-with-angular-resource/
[6]: http://en.proft.me/2015/07/4/angularjs-http-and-resource/