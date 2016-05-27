---
layout: post
title: AngularJS中$resource设置与获取headers
categories: angularjs
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

**设置**

```javascript
var app = angular.module('SocialApp', ['ngResource']);

app.factory('UserService', function($resource) {
  return $resource('/api/users/:id', {id: '@id'}, {
    get: {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    }
  });
});
```

**获取**

```javascript
app.controller('UserCtrl', function($scope, UserService) {
  UserService.get({id: 1}, function(data, headersGetter) {
    $scope.users = data;
    var contentType = headersGetter('content-type');
    console.log('content-type:' + contentType);
  });
});

// or
app.factory('UserService', function($resource) {
  return $resource('/api/users/:id', {id: '@id'}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(data, headersGetter) {
        var items = angular.fromJson(data);
        var contentType = headersGetter('content-type');
        console.log('content-type:' + contentType);
        return items;
      }
    }
  });
});
```

**更新列表：**

*



**参考文章：**

* [how to set custom headers with a $resource action][1]
* [How to access response headers using $resource in Angular][2]


[1]: http://stackoverflow.com/questions/18924217/how-to-set-custom-headers-with-a-resource-action
[2]: http://stackoverflow.com/questions/28405862/how-to-access-response-headers-using-resource-in-angular
