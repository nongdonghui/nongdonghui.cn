---
layout: post
title: Understanding AngularJS $resource
categories: angularjs
lastUpdated: 5.30
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

defaut actions

```javascript
{ 
  'get':    { method: 'GET' },
  'save':   { method: 'POST' },
  'query':  { method: 'GET', isArray: true },
  'remove': { method: 'DELETE' },
  'delete': { method: 'DELETE' }
}
```

Parameters interpretation(important):

> HTTP GET "class" actions: Resource.action([parameters], [success], [error])

> non-GET "class" actions: Resource.action([parameters], postData, [success], [error])

> non-GET instance actions: instance.$action([parameters], [success], [error])

**Example**

```javascript
// define
var User = $resource('/api/users/:id', {id: '@id'});

// get
var user = User.get({id: 1}, function() {
  $scope.user = user;
});
// equivalent
User.get({id: 1}, function(user) {
  $scope.user = user;
});
// equivalent
User.get({id: 1}).$promise.then(function(user) {
  $scope.user = user;
});
// equivalent
var user = User.get({id: 1});
user.$promise.then(function() {
   $scope.user = user;
});
// equivalent
$scope.user = User.get({id: 1});

// query
var users = User.query(function() {
  console.log(users);
});

// save
User.save($scope.user, function(response) {
  console.log('on success');
}, function(response) {
  console.log('on failure');
});

// delete
User.delete({id: 1}, function() {
  console.log('deleted from server');
});

// create a custom 'PUT' request
var User = $resource('/api/users/:id', {id: '@id'},
  {
    'update': {
      method: 'PUT'
    }
  }
);

$scope.user = User.get({ id: 1 });
$scope.user.name = 'newbie';
User.update({ id: 1 }, $scope.user);

// create a custom 'POST' request
var User = $resource('/api/users/:id', {id: '@id'},
  {
    'post': {
      method: 'PUT'
    }
  }
);

$scope.user = User.get({ id: 1 });
$scope.user.name = 'newbie';
User.post({ id: 1 }, $scope.user, function(response) {
  console.log(response);
});

// create a custom 'POST' and send request with array body
var User = $resource('/api/users/:id/:action', {id: '@id'},
  {
    'postUsers': {
      method: 'POST'
    }
  }
);
User.postUsers({ id: 1, action: 'postUsers' }, $scope.users, function(response) {
  console.log(response);
});
```

```java
// The server side codes using SpringMVC
@RequestMapping(
  value = "/api/users/{id}/postUsers",
  method = RequestMethod.POST,
  produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<List<User>> patchUsers(@PathVariable("id") String id, @RequestBody List<User> users) {
  if (StringUtils.isNotEmpty(id)) {
    logger.info("queryDialogDatas:{}", workItemId);
  } else {
    logger.info("IllegalArgument:param {} cannot be null.", "id");
  }
  return new ResponseEntity(HttpStatus.OK);
}
```

**更新列表：**

* 2016-5-30
* 填充内容



**参考文章：**

* [Understanding AngularJS $resource][1]
* [AngularJS $resource RESTful example][2]
* [$resource][3]
* [Add a custom method to $resource in Angular JS][4]
* [How to use AngularJS $resource custom actions][5]
* [Post JSON to spring REST webservice][6]
* [Implementing a REST service using Spring MVC][7]


[1]: https://www.sitepoint.com/premium/books/angularjs-novice-to-ninja/preview/understanding-angularjs-resource-e0638c0
[2]: http://stackoverflow.com/questions/13269882/angularjs-resource-restful-example
[3]: https://docs.angularjs.org/api/ngResource/service/$resource
[4]: http://stackoverflow.com/questions/30939499/add-a-custom-method-to-resource-in-angular-js
[5]: http://stackoverflow.com/questions/25928741/how-to-use-angularjs-resource-custom-actions
[6]: http://www.leveluplunch.com/java/tutorials/014-post-json-to-spring-rest-webservice/
[7]: https://www.initworks.com/wiki/display/public/Implementing+a+REST+service+using+Spring+MVC
