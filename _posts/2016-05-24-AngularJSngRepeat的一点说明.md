---
layout: post
title: AngularJS ngRepeat的一点说明
categories: angularjs
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

angularjs的ng-repeat的默认生成格式是ng-repear="(key, value) in collection"，它可以输出键值对，例如key={{key}}, value={{value}}。

**JavaScript**

```javascript
$scope.data = {
   "id": 2,
   "project": "wewe2012",
   "date": "2013-02-26",
   "description": "ewew",
   "eet_no": "ewew",
};
var array = [];
for(var key in $scope.data){
    var test = {};
    test[key]=$scope.data[key];
    array.push(test);
}
$scope.data = array;
```

**HTML**

```html
<p ng-repeat="obj in data">
   <font ng-repeat="(key, value) in obj">
      {{key}} : {{value}}
   </font>
</p>
```

**完整的小例子**

```html
<!DOCTYPE html>
<html ng-app>
<!--   w  ww .  j  a v  a 2  s  .  c om-->
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.13/angular.js"></script>
</head>
<body ng-app="myApp">
  <div ng-controller="MyCtrl">
    <ul>
      <li ng-repeat="(key, value) in school.sub">first language is = {{value}}</li>
    </ul>
  </div>
  <script type='text/javascript'>
    var myApp = angular.module('myApp', []);
    function MyCtrl($scope) {
      $scope.school = {
        name: "A",
        sub: {
          firstlang: "Java"
        }
      }
    }
  </script>
</body>
</html>
```

**更新列表：**

*



**参考文章：**

* [AngularJS Tutorial - ng-repeat with key and value pair][1]
* [How can I iterate over the keys, value in ng-repeat in angular][2]


[1]: http://www.java2s.com/Tutorials/Javascript/AngularJS_Example/Directives/2920__ng_repeat_with_key_and_value_pair.htm
[2]: http://stackoverflow.com/questions/15127834/how-can-i-iterate-over-the-keys-value-in-ng-repeat-in-angular
