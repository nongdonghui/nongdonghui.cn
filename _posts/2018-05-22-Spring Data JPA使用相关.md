---
layout: post
title: Spring Data JPA相关
categories: mycat
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


1.[官方][1]文档

2.[spring-boot][2]

3.异常

```
found character '@' that cannot start any token. (Do not use @ for indentation)
```

在application.yml中@中间的值@必须使用单引号括起来

4.

```
Caused by: javax.persistence.TransactionRequiredException: Executing an update/delete query
```

更新操作没有使用事务注解@Transactional

5.使用 @Modifying 注解完成修改操作

```
@Modifying
@Query("update Person set email = :email where lastName =:lastName")
void updatePersonEmailByLastName(@Param("lastName")String lastName,@Param("email")String email);
```

6.JPA可以使用case when语法

7.[JpaRepository 查询规范][17]

**更新列表：**

*



**参考文章：**

* [Spring Data JPA - Reference Documentation][1]
* [Spring boot][2]
* [SpringData 学习（5）—— 使用 @Modifying 注解完成修改操作][3]
* [jpa 本地查询 获取部分字段值][4]
* [Is there such thing CASE expression in JPQL?][5]
* [Jpa使用说明][6]
* [springdata jpa使用Example快速实现动态查询][7]
* [SpringDataJpa的Specification查询][8]
* [spring data jpa 利用JpaSpecificationExecutor做复杂查询][9]
* [Spring-Data-JPA 用Specification进行动态SQL查询][10]
* [spring Data jpa 动态写sql][11]
* [Spring Data JPA 复杂/多条件组合查询][12]
* [Springboot整合JPA以及动态条件查询的实现][13]
* [spring boot通过maven filter替换properties属性（多环境配置）][14]
* [Maven filter 配置的使用][15]
* [SpringBoot之LogBack常用配置][16]
* [JpaRepository 查询规范][17]
* [JPA使用数据库视图问题][18]

[1]: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/
[2]: https://github.com/spring-projects/spring-boot
[3]: https://blog.csdn.net/lw_power/article/details/51296353
[4]: https://blog.csdn.net/wyljz/article/details/53286750
[5]: https://stackoverflow.com/questions/427447/is-there-such-thing-case-expression-in-jpql
[6]: https://blog.csdn.net/tianyaleixiaowu/article/details/72983358
[7]: https://blog.csdn.net/long476964/article/details/79677526
[8]: https://blog.csdn.net/baijunzhijiang_01/article/details/51557125
[9]: https://blog.csdn.net/yingxiake/article/details/51014223
[10]: https://blog.csdn.net/niugang0920/article/details/79419232
[11]: https://blog.csdn.net/zhangweibin123/article/details/51782627
[12]: https://blog.csdn.net/ie8848520/article/details/8161986
[13]: https://blog.csdn.net/utopiaofartoria/article/details/78087494
[14]: https://blog.csdn.net/q397739000/article/details/53037649
[15]: http://bibithink.iteye.com/blog/2253457
[16]: https://blog.csdn.net/qq_25868207/article/details/78085673
[17]: https://blog.csdn.net/weixin_40344177/article/details/78469815
[18]: http://www.iteye.com/problems/91010







 








