---
layout: post
title: SpringBoot多数据源配置
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.新建一个@Configuration的配置文件映射类,@Primary @Bean设置一个主数据源

2.分别设置这3个来源
  User DataSource
  User EntityManagerFactory (userEntityManager)
  User TransactionManager (userTransactionManager)

3.entity和repository都要挂到相应数据源的位置

```
package com.xfj.cm.config;

import java.util.HashMap;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(basePackages = "com.nba.cm.*.repository.primary", entityManagerFactoryRef = "primaryEntityManager", transactionManagerRef = "primaryTransactionManager")
public class PrimaryDataSourceConfig {
	@Autowired
	private Environment env;

	@Primary
	@Bean
	public LocalContainerEntityManagerFactoryBean deviceEntityManager() {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setDataSource(deviceDataSource());
		em.setPackagesToScan(new String[] { "com.nba.cm.*.entity.primary" });

		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		em.setJpaVendorAdapter(vendorAdapter);
		HashMap<String, Object> properties = new HashMap<>();
		properties.put("hibernate.hbm2ddl.auto", env.getProperty("hibernate.hbm2ddl.auto"));
		properties.put("hibernate.dialect", env.getProperty("hibernate.dialect"));
		em.setJpaPropertyMap(properties);

		return em;
	}

	@Primary
	@Bean
	public DataSource primaryDataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName(env.getProperty("spring.primary.datasource.driver-class-name"));
		dataSource.setUrl(env.getProperty("spring.primary.datasource.url"));
		dataSource.setUsername(env.getProperty("spring.primary.datasource.username"));
		dataSource.setPassword(env.getProperty("spring.primary.datasource.password"));
		
		return dataSource;
	}

	@Primary
	@Bean
	public PlatformTransactionManager primaryTransactionManager() {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(deviceEntityManager().getObject());
		return transactionManager;
	}

}
```

如果没有指定主数据源@Primary,会报异常:

```
No qualifying bean of type 'javax.sql.DataSource' available: more than one 'primary' bean found
```

**更新列表：**

*



**参考文章：**

* [Spring JPA – Multiple Databases][1]
* [No qualifying bean of type 'javax.sql.DataSource' available: more than one 'primary' bean found][2]
* [Using Multiple DataSources with Spring Boot and JPA][3]
* [Using Multiple DataSources with Spring Boot and RoutingDataSource][4]


[1]: http://www.baeldung.com/spring-data-jpa-multiple-databases
[2]: https://blog.csdn.net/u014078154/article/details/78959541
[3]: https://o7planning.org/en/11653/using-multiple-datasources-with-spring-boot-and-jpa
[4]: https://o7planning.org/en/10869/using-multiple-datasources-with-spring-boot-and-routingdatasource