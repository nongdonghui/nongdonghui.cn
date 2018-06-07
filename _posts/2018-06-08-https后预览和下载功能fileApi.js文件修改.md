---
layout: post
title: https后预览和下载功能fileApi.js文件修改
categories: https
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

/UI2/system/components/justep/docCommon/fileApi.js

修改时,在system_X里面新建一个同目录名且同文件名的文件,在里面修改然后编译

55-65

```
var downLoadFrame = $('#_downloadFrame');
if(downLoadFrame.length === 0){
	downLoadFrame = $('<iframe id="_downloadFrame"></iframe>').css('display','none').appendTo(document.body);
}
downLoadFrame.attr('src',_url);
dtd.resolve(_url);
```

改为

```
var downLoadFrame = $('#_downloadFrame');
if(downLoadFrame.length === 0){
	downLoadFrame = $('<iframe id="_downloadFrame"></iframe>').css('display','none').appendTo(document.body);
}

var d_url = _url;
if (location && location.protocol == "https:") {
	if (d_url.indexOf("http:") == 0) {
		d_url = d_url.replace("http:", "https:");
	}
}
downLoadFrame.attr('src', d_url); // _url
dtd.resolve(d_url);               // _url
```

150-151

```
window.open(url, '_blank');
dtd.resolve(url);
```

改为

```
var o_url = url;
if (location && location.protocol == "https:") {
	if (o_url.indexOf("http:") == 0) {
		o_url = o_url.replace("http:", "https:");
	}
}
window.open(url, '_blank'); // url
dtd.resolve(url);           // url
```

**更新列表：**

*



**参考文章：**

* [][1]
* [][2]
* [][3]
* [][4]


[1]: 
[2]: 
[3]: 
[4]: 