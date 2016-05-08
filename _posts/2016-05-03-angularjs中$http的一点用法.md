---
layout: post
title: angularjs中$http的一点用法
---

{{ page.title }}
================

<p class="meta">03 May 2016 - Nanjing</p>

> angularjs使用$http简单的封装了js原生的XMLHttpRequest对象
### 链式调用
```javascript
$http({
  url: 'data.json',
  method: 'GET'
}).success(function(data, header, config, status) {
  // 响应成功    
}).error(function(data, header, config, status) {
  // 处理响应失败
});
```
$http服务是只能接受一个参数的函数，这个参数是一个对象，包含了用来生成HTTP请求的配置内容。  
这个函数返回一个promise对象，具有success和error两个方法。
### 返回值
```javascript
var promise = $http({
  method: 'GET',
  url: 'data.json'
});
```
由于$http方法返回一个promise对象，我们可以在响应返回时用then方法来处理回调。  
如果使用then方法，会得到一个特殊的参数，它代表了相应对象的成功或失败信息，  
还可以接受两个可选的函数作为参数。或者可以使用success和error回调代替。  
或者是这样：

```javascript
promise.success(function(data, status, config, headers) {
  //处理成功的响应
});
promise.error(function(data, status, hedaers, config) {
  //处理失败后的响应
});
```
then()方法与其他两种方法的主要区别是，它会接收到完整的响应对象，而success()和error()则会对响应对象进行析构。
### 快捷的get请求
```javascript
$http.get('/api/users.json');
```
get(...)方法返回HttpPromise对象，以再发送jsonp请求举例说明： 为了发送JSONP请求，其中url必须包含JSON_CALLBACK字样。jsonp(url, config) 其中config是可选的

```javascript
var promise = $http.jsonp('/api/users.json?callback=JSON_CALLBACK');
```
### 参数说明
```javascript
$http({
  method: 'GET',
  url: '/api/users.json',
  params: {
    'username': 'tan'
  }
});
```
其中设置对象可以包含以下主要的键：

`method` 可以是GET/DELETE/HEAD/JSONP/POST/PUT

`url` 绝对的或者相对的请求目标

`params` 字符串map或者对象

这个键的值是一个字符串map或对象，会被转换成查询字符串追加在URL后面。如果值不是字符串，会被JSON序列化。  
 比如这个：

```javascript
// 参数会转为?name=ari的形式
$http({
  params: {'name': 'ari'}
});
```
`data(字符串或者对象)`

 这个对象中包含了将会被当作消息体发送给服务器的数据。通常在发送POST请求时使用。  
 从AngularJS 1.3开始，它还可以在POST请求里发送二进制数据。  
 要发送一个blob对象，你可以简单地通过使用data参数来传递它。  
 例如：

```javascript
var blob = new Blob(['Hello world'], {type:'text/plain'});
$http({
  method: 'POST',
  url: '/',
  data: blob
});
```
### 响应对象
AngularJS传递给then()方法的响应对象包含了五个属性。

`data` 这个数据代表转换过后的响应体（如果定义了转换的话）

`status` 响应的HTTP状态码

`headers` 这个函数是头信息的getter函数，可以接受一个参数，用来获取对应名字值

例如，用如下代码获取X-Auth-ID的值：

```javascript
$http({
  method: 'GET',
  url: '/api/users.json'
}).then (resp) {
  // 读取X-Auth-ID
  resp.headers('X-Auth-ID');
});
```
`config` 这个对象是用来生成原始请求的完整设置对象。

`statusText（字符串）` 这个字符串是响应的HTTP状态文本。
### 缓存HTTP请求
 默认情况下，$http服务不会对请求进行本地缓存。  
 在发送单独的请求时，我们可以通过向$http请求传入一个布尔值或者一个缓存实例来启用缓存。

```javascript
$http.get('/api/users.json', {cache: true})
  .success(function(data) {})
  .error(function(data) {});
```
第一次发送请求时，$http服务会向`/api/users.json`发送一个GET请求。  
第二次发送同一个GET请求时，$http服务会从缓存中取回请求的结果，而不会真的发送一个HTTP GET请求。  
在这个例子里，由于设置了启用缓存，AngularJS默认会使用`$cacheFactory`,这个服务是AngularJS在启动时自动创建的。  
如果想要对AngularJS使用的缓存进行更多的自定义控制，可以向请求传入一个自定义的缓存实例代替true。