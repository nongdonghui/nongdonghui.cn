---
layout: post
title: escape / encodeURI / encodeURIComponent
categories: javascript
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

**1.escape()**

从ECMAScript v3开始已经过时了

**2.encodeURI()**

当你要保证url的可用性，则可以调用：

```javascript
encodeURI("http://www.google.com/a file with spaces.html")
```

转换为：

```
http://www.google.com/a%20file%20with%20spaces.html
```

不要误用encodeURIComponent，因为它会破坏URL

```javascript
encodeURIComponent("http://www.google.com/a file with spaces.html")
```

转换为：

```
http%3A%2F%2Fwww.google.com%2Fa%20file%20with%20spaces.html
```

**3.encodeURIComponent()**

使用encodeURIComponent编码某一个参数的值

比如你要传递一个包含url的param1参数到url中，可以这样编码：

```javascript
param1 = encodeURIComponent("http://xyz.com/?a=12&b=55")
```

然后将param1写入到参数中：

```javascript
url = "http://domain.com/?param1=" + param1 + "&param2=99";
```

然后最终的url会变成这样：

```html
http://www.domain.com/?param1=http%3A%2F%2Fxyz.com%2F%Ffa%3D12%26b%3D55&param2=99
```

注意encodeURIComponent不会自动处理'字符，比如在url中传入类似参数href='MyUrl'将会遇到注入bug，建议将'改用"替换或者加('')包裹参数值。

更多详情请查看：<http://en.wikipedia.org/wiki/Percent-encoding>

**在java后台接收之后要进行转码**

```java
import java.net.URLDecoder;

String decodeUrl = URLDecoder.decode(url, "UTF-8");
```

**更新列表：**

*



**参考文章：**

* [When are you supposed to use escape instead of encodeURI / encodeURIComponent][1]
* [Java equivalent to JavaScript's encodeURIComponent that produces identical output?][2]
* [How to get Java to match JavaScript encodeURIComponent() method?][3]


[1]: http://stackoverflow.com/questions/75980/when-are-you-supposed-to-use-escape-instead-of-encodeuri-encodeuricomponent
[2]: http://stackoverflow.com/questions/607176/java-equivalent-to-javascripts-encodeuricomponent-that-produces-identical-outpu
[3]: http://stackoverflow.com/questions/25298063/how-to-get-java-to-match-javascript-encodeuricomponent-method
