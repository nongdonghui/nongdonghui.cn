---
layout: post
title: javascript删除数组指定元素
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>



```
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}
var somearray = ["mon", "tue", "wed", "thur"]
removeByValue(somearray, "tue");

// somearray will now have "mon", "wed", "thur"
```

**更新列表：**

*



**参考文章：**

* [JavaScript从数组中删除指定值元素的方法][1]
* [][2]

[1]: https://blog.csdn.net/cocos2dGirl/article/details/50534829
[2]: 