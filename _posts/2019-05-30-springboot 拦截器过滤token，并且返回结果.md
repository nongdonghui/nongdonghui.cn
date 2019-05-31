---
layout: post
title: springboot 拦截器过滤token，并且返回结果
categories: SpringBoot
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


```
public class LoginInterceptor implements HandlerInterceptor {
    ......
    @Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object arg) throws Exception {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=utf-8");

		boolean allowGoing = true;
		String token = request.getHeader("Authorization");
		ResponseResult result = new ResponseResult();

		String uri = request.getRequestURI();
		if (!uri.endsWith("/login")) {
			if (StringUtils.isEmpty(token)) {
				handleNotAuthenticated(result, response);
				allowGoing = false;
			} else {
				Object obj = CacheUtil.getUser(token);

				if (null == obj) {
					handleNotAuthenticated(result, response);
					allowGoing = false;
				}
			}
		}

		return allowGoing;
	}
    public void handleNotAuthenticated(ResponseResult result, HttpServletResponse response) throws JsonProcessingException {
		result.setSuccess(false);
		result.setObj("Not Authenticated");
		result.setMsg("请先登录");

		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(j);

		PrintWriter writer = null;
		try {
			writer = response.getWriter();
			writer.print(json);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (writer != null) {
				writer.close();
			}
		}
	}
    ......
}
```


**更新列表：**



**参考文章：**

* [springboot 拦截器过滤token，并且返回结果][1]
* [springboot(前后端分离)登录拦截器+token过期返回状态码][2]
* [Spring boot Jackson常用方法][3]
* [][4]

[1]: https://blog.csdn.net/qq_33212500/article/details/80452422
[2]: https://blog.csdn.net/qq_37759106/article/details/81386876
[3]: https://blog.csdn.net/u010226454/article/details/80895436
[4]: 