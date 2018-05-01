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


**更新列表：**

*



**参考文章：**

* [java 8 stream 小结][1]
* [Java 8 Comparator: How to Sort a List][2]
* [][3]
* [][4]


[1]: https://my.oschina.net/u/563488/blog/1614197
[2]: https://dzone.com/articles/java-8-comparator-how-to-sort-a-list
[3]: 
[4]: 