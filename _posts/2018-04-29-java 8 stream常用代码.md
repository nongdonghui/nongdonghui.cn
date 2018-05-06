---
layout: post
title: java 8 常用代码
categories: java
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.List排序

```
List<Movie> movies = Arrays.asList(
        new Movie("Lord of the rings"),
        new Movie("Back to the future"),
        new Movie("Carlito's way"),
        new Movie("Pulp fiction"));
movies.sort(Comparator.comparing(Movie::getTitle));

输出结果:
Movie(title=Back to the future)
Movie(title=Carlito's way)
Movie(title=Lord of the rings)
Movie(title=Pulp fiction)

movies.sort(Comparator.comparing(Movie::getTitle).reversed());

输出结果:
Movie(title=Pulp fiction)
Movie(title=Lord of the rings)
Movie(title=Carlito's way)
Movie(title=Back to the future)

自定义排序:


List<Movie> movies = Arrays.asList(
        new Movie("Lord of the rings", 8.8, true),
        new Movie("Back to the future", 8.5, false),
        new Movie("Carlito's way", 7.9, true),
        new Movie("Pulp fiction", 8.9, false));

movies.sort((m1, m2) -> {
    if(m1.getStarred() == m2.getStarred()){
        return 0;
    }
    return m1.getStarred() ? -1 : 1;
});
```

2.将List转换为Map

场景: 需要将List<Bean>中以某个字段为Map的key,value为这个bean,用来做map.get用

TestListMap.java

```
package com.mkyong.java8

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class TestListMap {

    public static void main(String[] args) {

        List<Hosting> list = new ArrayList<>();
        list.add(new Hosting(1, "liquidweb.com", 80000));
        list.add(new Hosting(2, "linode.com", 90000));
        list.add(new Hosting(3, "digitalocean.com", 120000));
        list.add(new Hosting(4, "aws.amazon.com", 200000));
        list.add(new Hosting(5, "mkyong.com", 1));

        // key = id, value - websites
        Map<Integer, String> result1 = list.stream().collect(
                Collectors.toMap(Hosting::getId, Hosting::getName));

        System.out.println("Result 1 : " + result1);

        // key = name, value - websites
        Map<String, Long> result2 = list.stream().collect(
                Collectors.toMap(Hosting::getName, Hosting::getWebsites));

        System.out.println("Result 2 : " + result2);

        // Same with result1, just different syntax
        // key = id, value = name
        Map<Integer, String> result3 = list.stream().collect(
                Collectors.toMap(x -> x.getId(), x -> x.getName()));

        System.out.println("Result 3 : " + result3);

	// key = id, value = Hosting
	Map<String, Hosting> hostingMap = list.stream().collect(toMap(Hosting::getId, hosting -> hosting));
    }
}
```

**更新列表：**

*



**参考文章：**

* [java 8 stream 小结][1]
* [Java 8 Comparator: How to Sort a List][2]
* [Java 8 将List转换为Map][3]
* [][4]


[1]: https://my.oschina.net/u/563488/blog/1614197
[2]: https://dzone.com/articles/java-8-comparator-how-to-sort-a-list
[3]: https://blog.csdn.net/Hatsune_Miku_/article/details/73435580
[4]: 