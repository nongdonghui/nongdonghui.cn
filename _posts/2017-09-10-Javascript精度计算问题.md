---
layout: post
title: Javascript精度计算问题
categories: javascript
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```javascript
// 保留3位小数   
// 功能：将浮点数四舍五入，取小数点后3位  
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x*1000)/1000;
    return f;
}
```

**参考文章：**

* [js 浮点小数计算精度问题 parseFloat 精度问题][1]


[1]: http://www.cnblogs.com/gaoxue/p/3431255.html