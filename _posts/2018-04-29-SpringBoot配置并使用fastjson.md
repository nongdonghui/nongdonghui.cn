---
layout: post
title: SpringBoot配置并使用fastjson
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.在pom.xml添加依赖

```
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
</dependency>
```

2.在启动类注入bean

```
@Bean
public HttpMessageConverters fastJsonHttpMessageConverters() {
    // 1、需要先定义一个 convert 转换消息的对象;
    FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();        
    //2、添加fastJson 的配置信息，比如：是否要格式化返回的json数据;
    FastJsonConfig fastJsonConfig = new FastJsonConfig();
    fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);       
    //3、在convert中添加配置信息.
    fastConverter.setFastJsonConfig(fastJsonConfig);
    HttpMessageConverter<?> converter = fastConverter;
    return new HttpMessageConverters(converter);
}
```

3.传输

post方式提交,header如下

Content-Type: application/json

Accept-Charset: UTF-8

body如下

```
{
  "newData":
  [
    {"fbeginDate":1524931200000, "fcreateTime":1524968401097},
    {"fbeginDate":1524931200000, "fcreateTime":1524968401097}
  ],
  "editData":
  [
    {"fbeginDate":1524931200000, "fcreateTime":1524968401097},
    {"fbeginDate":1524931200000, "fcreateTime":1524968401097}
  ],
  "operator":"ndh",
  "operatorId":"ndhId"
}
```

启动newData和editData是2个数组

在接收端代码为

```
@RequestMapping(value = "/save", method = RequestMethod.POST)
public ResponseEntity<String> save(@RequestBody(required = true) Map<String, Object> params) {
	try {
		List<User> editUsers = JsonUtils.toList(params.get("editData").toString(), User.class);
		userService.update(editUsers);
		List<User> newUsers = JsonUtils.toList(params.get("newData").toString(), User.class);
		userService.save(newUsers);
		String operator = ObjectUtils.nullSafeToString(params.get("operator"));
		String operatorId = ObjectUtils.nullSafeToString(params.get("operatorId"));
	} catch (Exception e) {
		e.printStackTrace();
	}
	return ResponseEntity.ok().header("Content-Type", "text/plain").body("reset=true");
}
```

JsonUtils.java

```
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class JsonUtils {
	public static String toJson(Object obj) throws Exception {
		return JSON.toJSONString(obj);
	}

	public static <T> T toObj(String jsonStr, Class<T> clazz) throws Exception {
		return JSON.parseObject(jsonStr, clazz);
	}

	public static <T> List<T> toList(String jsonStr, Class<T> clazz) throws Exception {
		return JSON.parseArray(jsonStr, clazz);
	}

	public static <T> Map<String, Object> toMap(String jsonStr) throws Exception {
		return JSON.parseObject(jsonStr, Map.class);
	}

	public static <T> T toObj(Map<?, ?> map, Class<T> clazz) throws Exception {
		return JSON.parseObject(JSON.toJSONString(map), clazz);
	}
}
```

其中遇到的错误是:

```
Failed to read HTTP message: org.springframework.http.converter.HttpMessageNotReadableException: JSON parse error: exepct '[', but {, pos 1, json : {
```

在第一行必须使用数组,但是使用了对象,那么就是必须在第一行使用数组,必须修改数据,再包装

4.HttpClient 使用PostMethod传递json

```
/** 
     * 获取post请求响应 
     * @param url 
     * @param params 
     * @return 
     */  
    public static String urlPostMethod(String url,String params) {  
        HttpClient httpClient = new HttpClient();  
        PostMethod method = new PostMethod(url);  
        try {  
            if(params != null && !params.trim().equals("")) {  
                RequestEntity requestEntity = new StringRequestEntity(params,"text/xml","UTF-8");  
                method.setRequestEntity(requestEntity);  
            }  
            method.releaseConnection();  
            httpClient.executeMethod(method);  
            String responses= method.getResponseBodyAsString();  
            return responses;  
        } catch (HttpException e) {  
            e.printStackTrace();  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return null;  
    } 
 

调用： 

String getURL = "http://localhost:8080/pr/rest/aggregation/getAll";  
String params = "{everyPageNum:22,currentPage:1}";  
String s = DataAggregationUtil.urlPostMethod(getURL, params);  
  
System.out.println(s);  
```

**更新列表：**

*



**参考文章：**

* [springboot使用fastJson作为json解析框架][1]
* [spring boot 接受ajax数组][2]
* [SpringBoot学习之Json数据交互][3]
* [HttpClient PostMethod 传递json][4]


[1]: https://www.cnblogs.com/xujie09/p/8461483.html
[2]: https://blog.csdn.net/yulio1234/article/details/77978340
[3]: https://blog.csdn.net/jsj13263690918/article/details/79837514
[4]: http://www.360doc.com/content/18/0429/23/607616_749783420.shtml