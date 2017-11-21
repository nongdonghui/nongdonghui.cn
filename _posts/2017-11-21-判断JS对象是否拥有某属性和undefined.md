---
layout: post
title: 判断JS对象是否拥有某属性和undefined
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


1.可以用 in操作符 和 对象的 hasOwnProperty 操作符

举例

```javascript
"prop" in Object

Object.hasOwnProperty("prop")
```

2.判断undefined

```javascript
var tmp = undefined; 
if (typeof(tmp) == "undefined") { 
    alert("undefined"); 
}
```

**更新列表：**

*



**参考文章：**

* [判断JS对象是否拥有某属性][1]
* [JS中判断null、undefined与NaN的方法][2]

[1]: http://wenwen.sogou.com/z/q704025845.htm
[2]: http://www.jb51.net/article/48481.htm