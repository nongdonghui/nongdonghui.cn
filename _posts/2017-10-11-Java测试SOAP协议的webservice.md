---
layout: post
title: Java测试SOAP协议的webservice
categories: jaxws
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

```
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Iterator;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class TestWs {

	public static void main(String[] args) throws Exception {
		test();
	}
	
	/**
	 * @param args
	 */
	public static void test() throws Exception {
		URL wsUrl = new URL("http://192.168.1.120:8080/project_name/SingleSignOn");

		HttpURLConnection conn = (HttpURLConnection) wsUrl.openConnection();

		conn.setDoInput(true);
		conn.setDoOutput(true);
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "text/xml;charset=UTF-8");

		OutputStream os = conn.getOutputStream();

		String soap = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:sso=\"http://sso.ws.eppenpf.com/\">"
				+ "<soapenv:Body> <sso:signOn> <args0>system</args0> <args1>?</args1> <args2>?</args2> </sso:signOn> </soapenv:Body> </soapenv:Envelope>";

		os.write(soap.getBytes());

		InputStream is = conn.getInputStream();

		/*byte[] b = new byte[1024];
		int len = 0;
		String s = "";
		while ((len = is.read(b)) != -1) {
			String ss = new String(b, 0, len, "UTF-8");
			s += ss;
		}
		System.out.println(s);*/
		
		Document document = Jsoup.parse(is, "gbk", "");
		
		Elements links = document.getElementsByTag("returnresult");
		for (Iterator<Element> it = links.iterator(); it.hasNext();) {  
		    Element e = (Element) it.next();  
		    System.out.println(e.text());  
		} 

		System.err.println(document);

		is.close();
		os.close();
		conn.disconnect();
	}

}

```

* maven 打包 goals = install

**更新列表：**

*



**参考文章：**

* [09_httpclient测试SOAP协议][1]
* [使用HttpClient工具类测试WebService接口(soap)][2]
* [webservice soap脱离客户端代码单独http调试][3]
* [Java 常调用的Webservice接口的方法][4]


[1]: http://www.cnblogs.com/HigginCui/p/5840044.html
[2]: http://www.cnblogs.com/zw520ly/p/5892439.html
[3]: http://blog.csdn.net/imlsz/article/details/45690287
[4]: http://www.cnblogs.com/koal/p/4982762.html