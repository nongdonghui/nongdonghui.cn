---
layout: post
title: javascript替换某个位置的字符
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>



```
function replaceChat(source,pos,newChar){
     if(pos<0||pos>=source.length||source.length==0){
         return "invalid parameters...";
     }
     var iBeginPos= 0, iEndPos=source.length;
     var sFrontPart=source.substr(iBeginPos,pos);
     var sTailPart=source.substr(pos+1,source.length);
     var sRet=sFrontPart+newChar+sTailPart;
     return sRet;
 }
    alert(replaceChat("happy",1,"b"));
```

**更新列表：**

*



**参考文章：**

* [JavaScript 在字符串中替换某个位置的字符][1]
* [][2]

[1]: https://blog.csdn.net/tjssehaige/article/details/31501387
[2]: 