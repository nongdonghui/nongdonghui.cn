---
layout: post
title: angularjs中使用ng-repeat渲染最后一个li的时候设置不同样式
---

{{ page.title }}
================

`{{ page.date | date: "%Y.%m.%d" }} - 南京`

如题所示，比如我要在下面的代码的最后一个li节点添加一个样式

```html
<li ng-repeat="item in items">  
  \{{item.name}}  
</li> 
```
那么我就可以这样加

```html
<li ng-repeat="item in items" ng-class="{'item-last':$last}">
  {{item.name}}
</li>
```
还有一种方法就是使用js计算的方法

```html
<li ng-repeat="item in items" ng-class="isLast($last)">
  {{item.name}}
</li>
```
Controller中的代码定义是这样

```js
$scope.isLast = function(flag) {  
    return flag ? 'item-last' : 'item-not-last';  
};
```
CSS定义是这样

```css
.item-last { /* Your Styles */ }
.item-not-last { /* Your Styles */ }
```
对，这就是一个三元运算，你可以直接在html里面用，像这样

```html
<li ng-repeat="item in items" ng-class="$last ? 'item-last' : 'item-not-last'">
  {{item.name}}
</li>
```
ngRepeat还有以下几种类型：

|  Variable  |  Type      |  Details                                                                     |  
|  --------- |  --------- |  --------------------------------------------------------------------------  |  
|  `$index`  |  `number`  |  iterator offset of the repeated element (0..length-1)                       |  
|  `$first`  |  `boolean` |  true if the repeated element is first in the iterator.                      |  
|  `$middle` |  `boolean` |  true if the repeated element is between the first and last in the iterator. |  
|  `$last`   |  `boolean` |  true if the repeated element is last in the iterator.                       |  
|  `$even`   |  `boolean` |  true if the iterator position $index is even (otherwise false).             |  
|  `$odd`    |  `boolean` |  true if the iterator position $index is odd (otherwise false).              |  

**参考文章：**

  * [Different class for the last element in ng-repeat][1]
  * [ngRepeat][2]


[1]: http://stackoverflow.com/questions/14581658/different-class-for-the-last-element-in-ng-repeat
[2]: https://docs.angularjs.org/api/ng/directive/ngRepeat