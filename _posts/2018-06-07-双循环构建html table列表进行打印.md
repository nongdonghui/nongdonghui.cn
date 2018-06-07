---
layout: post
title: 双循环构建html table列表进行打印
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.css

```css
.td-x {
	border: solid #000;
	border-width: 0px 1px 1px 0px;
}

.table-x {
	border: solid #000;
	border-width: 1px 0px 0px 1px;
}

```

2.js


```
Model.prototype.modelLoad = function(event){
	var parents = [ {
		id : 1,
		billCode : "001",
		date : "2018-06-07"
	}, {
		id : 2,
		billCode : "001",
		date : "2018-06-07"
	} ];
	
	var childen = [ {
		name : "jack",
		num : 10,
		price : 5,
		pid : 1
	}, {
		name : "jack",
		num : 10,
		price : 5,
		pid : 1
	}, {
		name : "jack",
		num : 10,
		price : 5,
		pid : 2
	} ];
	
	var pageBreak = '<div style="page-break-after:always"></div>';
	var rootDiv = $(this.getElementByXid("rootDiv"));
	for (var i = 0; i < parents.length; i++) {
		var cardDiv = "";
		for (var j = 0; j < childen.length; j++) {
			if (j === 0 || j % 4 === 0) {
				cardDiv = "";
				// 头部
				cardDiv = cardDiv + "单号:" + parents[i].billCode + ", 日期:" + parents[i].date + "<br/>";
				cardDiv = cardDiv + "<table class='table-x'><tr style='height:15px'><td class='td-x' width='100px'>物品名称</td><td class='td-x' width='60px'>数量</td><td class='td-x' width='80px'>单价</td></tr>";
			}
			
			// 追加行
			cardDiv = cardDiv + "<tr><td class='td-x'>" + childen[j].name + "</td><td class='td-x'>" + childen[j].num + "</td><td class='td-x'>" + childen[j].price + "</td></tr>";
			
			if (j > 0 && j % 4 === 0) {
				// 每4条记录,加分页标识
				cardDiv = cardDiv + "</table>";
				rootDiv.append(cardDiv);
				rootDiv.append(pageBreak);
			}
			
			if (j === childen.length - 1) {
				// 最后一条记录
				if (j === 0 || j % 4 !== 0) {
					cardDiv = cardDiv + "</table>";
					rootDiv.append(cardDiv);
					
					// 外层不是最后一条记录,继续分页
					if (i !== parents.length - 1) {
						rootDiv.append(pageBreak);
					}
				}
			}
		}
	}
};

```

3.html

```
<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" xid="window" design="device:pc;">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;left:334px;top:318px;"
    onLoad="modelLoad"></div>  
  <a component="$UI/system/components/justep/button/button" class="btn btn-default"
    label="打印" xid="printBtn" onClick="{&quot;operation&quot;:&quot;printHtml1.print&quot;}"> 
    <i xid="i9"/>  
    <span xid="span13">打印</span>
  </a>
  <div xid="rootDiv"/>
  <span component="$UI/system/components/justep/printHtml/printHtml" xid="printHtml1"
    target="rootDiv"/>
</div>
```

**更新列表：**

*



**参考文章：**

* [][1]

[1]: 