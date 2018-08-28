---
layout: post
title: javascript二进制和十进制相互转换
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>



```
function ten(num) {
    var sum = 0, tmp = 1;
    for (var i=0, len=num.length; i<len; i++) {
        if (num[i] == 1) {
            tmp = 1;
            for (var j=i+1; j<len; j++) {
                 tmp *= 2;
            }
            sum += tmp;
        }
    }
    return sum;
}
 
var num1=a=0, arr=[];
function bin(num) {
    len = arr.length;
    arr[len] = num%2;
    a = parseInt(num/2);
    if (a >= 2) {
        bin(a);
    } else if (a == 1) {
        bin(a);
    }
}
 
 
bin(1100100);
num1 = arr.reverse().join('');
console.log(num1);
console.log(ten(num1));
```

**更新列表：**

*



**参考文章：**

* [js二进制和十进制相互转换][1]
* [][2]

[1]: https://blog.csdn.net/molaifeng/article/details/10228281
[2]: 