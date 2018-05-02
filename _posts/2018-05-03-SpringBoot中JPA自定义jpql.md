---
layout: post
title: SpringBoot中JPA自定义jpql
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

service层

```
@PersistenceContext
private EntityManager entityManager;

String sql = "s.fpath like '" + String.join("%' OR s.fpath like '", paths.split(",")) + "%'";
String idsInWhere = "'" + String.join("','", stateFrom.split(",")) + "'";
sql = "update Secondment s set s.fstate=:stateTo where s.fid in(" + idsInWhere + ") or (" + sql
		+ ") AND s.fstate=:stateFrom";
int updatedCount = entityManager.createQuery(sql).setParameter("stateFrom", stateFrom).setParameter("stateTo", stateTo)
						.executeUpdate();
```

**更新列表：**

*



**参考文章：**

* [SpringData-JPA教程][1]
* [封装JPA(Hibernate)动态查询（CriteriaQuery）][2]


[1]: https://wenku.baidu.com/view/809fed0859fb770bf78a6529647d27284b7337ac.html
[2]: https://www.oschina.net/code/snippet_1864608_37194
