---
layout: post
title: Understanding AngularJS $resource
categories: angularjs
lastUpdated: 5.31
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
* 2016-5-31

A full demonstration:

**1-UserResource.java**

```java
package com.risinda.erp.mbl.facade;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/api")
public class UserResource {
  public static List<User> userList = new ArrayList<User>();
  static {
    for (int i = 0; i < 3; i++) {
      User u = new User();
      u.setId(i);
      u.setName("我是" + i);
      userList.add(u);
    }
  }
  
  @RequestMapping(value = "/users",
          method = RequestMethod.POST,
          produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<User> create(@RequestBody User user) {
    int i = 0;
    for (User u : userList) {
      if (u.getId() > i) {
        i = u.getId();
      }
    }
    User u = new User();
    u.setId(i + 1);
    u.setName("我是" + (i + 1) );
    userList.add(u);
    return new ResponseEntity<User>(user, HttpStatus.OK);
  }
  
  @RequestMapping(value = "/users/{id}",
      method = RequestMethod.DELETE,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Void> delete(@PathVariable Integer id) {
    for (User u : userList) {
      if (u.getId().equals(id)) {
        userList.remove(u);
      }
    }
    return new ResponseEntity<Void>(HttpStatus.OK);
  }
  
  @RequestMapping(value = "/users/{id}",
          method = RequestMethod.PUT,
          produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<User> update(@RequestBody User user) {
    for (User u : userList) {
      if (u.getId().equals(user.getId())) {
        u.setName(user.getName());
      }
    }
    return new ResponseEntity<User>(user, HttpStatus.OK);
  }
  
  @RequestMapping(value = "/users/{id}",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<User> get(@PathVariable Integer id) {
    User user = null;
    for (User u : userList) {
      if (u.getId().equals(id)) {
        user = u;
      }
    }
    return new ResponseEntity<User>(user, HttpStatus.OK);
  }
  
  @RequestMapping(value = "/users",
      method = RequestMethod.GET,
      produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<User>> getAll() {
    return new ResponseEntity<List<User>>(userList, HttpStatus.OK);
  }
}
class User implements Serializable {
  private static final long serialVersionUID = 1L;
  
  private Integer id;
  private String name;
  
  public Integer getId() {
    return id;
  }
  public void setId(Integer id) {
    this.id = id;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
}
```

**2-UserService**

```javascript
.factory('UserService', function ($resource, HOST, localStorageService) {
  return $resource(
    HOST + 'api/users/:id/:action',
    {
      id: '@id',
      action: '@action',
      access_token: angular.fromJson(localStorageService.getItem('profile')).access_token
    },
    {
      'update': {
        method: 'PUT'
      }
    }
  );
})
```

**3-Controller**

```javascript
.controller('UserCtrl', function($scope, UserService) {
  $scope.add = function() {
    var newUser = {name: 'I am 101'};
    UserService.save(newUser, function(result) {
      console.log(result);
    });
  };

  $scope.delete = function() {
    UserService.delete({id: 101}, function(result) {
      console.log(result);
    });
  };

  $scope.get = function() {
    UserService.get({id: 1}, function(result) {
      console.log(result);
    });
  };

  $scope.update = function() {
    var modifyingUser = {
      id: 1,
      name: 'I am 1++'
    };
    UserService.update(modifyingUser, function(result) {
      console.log(result);
    });
  };

  $scope.getAll = function() {
    UserService.query(function(result) {
      console.log(result);
    });
  };
});
```

**4-invoked result**

$scope.add();

![add_user](/images/add_user.png)

$scope.delete();

![delete_Forbidden](/images/delete_Forbidden.png)

Add `DELETE` to param-value of cors.allowed.methods in web.xml and reinvoke $scope.delete();

![delete_ok](/images/delete_ok.png)

$scope.get();

![get_user1](/images/get_user1.png)

$scope.update();

![update_user1](/images/update_user1.png)

$scope.getAll();

![get_all_user](/images/get_all_user.png)



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
