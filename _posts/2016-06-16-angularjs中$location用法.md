---
layout: post
title: angularjs中&location用法
categories: angularjs
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

有时候需要解析url中的参数，那么angularjs为我们提供了$location这个内置函数，用法如下：

```javascript
function TestController($scope, $location) {
  var url = 'http://www.google.com/?search=java&business=001';
  $scope.url = $location.url(url);
  console.log('path:' + $scope.url.path());
  console.log('search:' + $scope.url.search().search);
  console.log('business:' + $scope.url.search().business);
}
```

输出如下

```
path:/http://www.google.com/
search:java
business:001
```

注意，$location的原意是来处理地址栏的url信息的，所以当你在上面使用$scope.url.port()这样的方法时，是获取到访问目的地的端口，而不是google的端口，我们只是借助$location的url来方便我们处理参数信息

**更新列表：**

*



**参考文章：**

* [How to get the url parameters using angular js][1]
* [$location][2]


[1]: http://stackoverflow.com/questions/11758079/how-to-get-the-url-parameters-using-angular-js
[2]: https://docs.angularjs.org/api/ng/service/$location
