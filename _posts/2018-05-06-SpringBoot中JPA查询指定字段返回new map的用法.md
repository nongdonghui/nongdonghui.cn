---
layout: post
title: SpringBoot中JPA查询指定字段返回new map的用法
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

service层示例代码

```java

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.common.collect.Maps;

@Service
@Transactional
public class AttendanceRecordService {
    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public Map<String, String> findByFdeviceCodeAndFrecordTimeBetween(String fdeviceCode, Date startTime,
			Date endTime) {
        String sql = "select new map(a.fpersonId as fpersonId, a.frecordTime as frecordTime) from AttendanceRecord a where a.fdeviceCode=?1 and a.frecordTime between ?2 and ?3";
        List<Map> resultList = entityManager.createQuery(sql).setParameter(1, fdeviceCode).setParameter(2, startTime)
				.setParameter(3, endTime).getResultList();
        Map<String, String> recordMap = Maps.newHashMap();
        for (Map m : resultList) {
	    recordMap.put(m.get("fpersonId").toString() + m.get("frecordTime").toString(), "1");
        }
        return recordMap;
    }

}

```

**更新列表：**

*



**参考文章：**

* [Spring data jpa 自定义查询返回，用FastJson把Map转换为JavaBean][1]
* [Hibernate调优之select new map()][2]
* [spring data jpa 查询自定义字段，转换为自定义实体][3]


[1]: https://blog.csdn.net/dgutliangxuan/article/details/78782170
[2]: https://blog.csdn.net/z69183787/article/details/41362093
[3]: https://blog.csdn.net/zhu562002124/article/details/75097682
