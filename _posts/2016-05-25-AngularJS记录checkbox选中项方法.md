---
layout: post
title: AngularJS记录checkbox选中项方法
categories: angularjs
lastUpdated: 5.27
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

**使用对象记录**

```html
<!DOCTYPE html>
<html ng-app>
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.js"></script>
</head>
<body ng-app="myApp">
  <div ng-controller="MyCtrl">
    <ul>
      <li ng-repeat="item in collection">
        <input type="checkbox" ng-model="checkedValues[item.id]">{{item.name}}
      </li>
    </ul>
    <button ng-click="showChecked()">show checked</button>
  </div>
  <script type='text/javascript'>
    var myApp = angular.module('myApp', []);
    function MyCtrl($scope) {
      $scope.collection = [
        {
          id: '001',
          name: 'one'
        },
        {
          id: '002',
          name: 'two'
        }
      ];
      $scope.checkedValues = {};
      $scope.showChecked = function() {
        alert(JSON.stringify($scope.checkedValues));
      };
    }
  </script>
</body>
</html>
```

如果你的对象数组中含有checked字段记录选中项，那可以直接在上面绑定该字段

```html
<input type="checkbox" ng-model="item.checked">{{item.name}}
```



**更新列表：**

* 2016-5-27
* 添加引用



**参考文章：**

* [How to bind to list of checkbox values with AngularJS][1]


[1]: http://stackoverflow.com/questions/14514461/how-to-bind-to-list-of-checkbox-values-with-angularjs
