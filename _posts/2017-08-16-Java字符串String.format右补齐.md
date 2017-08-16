---
layout: post
title: Java字符串String.format右补齐
categories: java
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 银川 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

  
1.指定输出位数，不足则右方用空格补齐

```
System.out.println(String.format("%-10s", "ab"));
```

如果需要左补齐，则去掉负号即可：

```
System.out.println(String.format("%10s", "ab"));
```

2.指定输出位数，不足左侧用0补齐

```
System.out.println(String.format("%010d", 1));
```

3.用不同的开头

```
public static String getUserNo(int preNumber, Long index){
    return String.format("%d%010d", preNumber, index);
}

public static void main(String[] args) {
    Long num1 = 1024L;
    Long num2 = 2048L;
    System.out.println("用户号为：" + getUserNo(1,num1));
    System.out.println("企业号为：" + getUserNo(2,num2));
}

打印结果为：
用户号为：10000001024
企业号为：20000002048
```



**更新列表：**

*



**参考文章：**

* [Java字符串右补齐——String.format][1]
* [Java字符串format-用户号补齐格式化应用][2]


[1]: http://www.cnblogs.com/nightowc/p/4460214.html
[2]: http://blog.csdn.net/luckykapok918/article/details/71325942
