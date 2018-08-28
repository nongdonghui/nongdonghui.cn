---
layout: post
title: javascript判断日期格式
categories: javascript
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

可以输入20180909或2018-09-09格式的日期进行校验

```
var commonUtils = {};
commonUtils.isDate = function(strDate) {
	var strSeparator = "-"; // 日期分隔符   
	var strDateArray = [];
	var intYear;
	var intMonth;
	var intDay;
	var boolLeapYear;
	
	if (commonUtils.isNull(strDate)) {
		return false;
	}
	
	if (strDate.length == 10) {
		if (!/^(\d{4})-(\d{2})-(\d{2})$/.exec(strDate)) {
			return false;			
		} else {
			strDateArray = strDate.split(strSeparator);
		}
	} else if (strDate.length == 8) {
		if (!/^(\d{8})$/.exec(strDate)) {
			return false;
		} else {
			var y = strDate.substring(0, 4);
			var m = strDate.substring(4, 6);
			var d = strDate.substring(6, 8);
			strDateArray[0] = y;
			strDateArray[1] = m;
			strDateArray[2] = d;
		}
	} else {
		return false;
	}
	
	if (strDateArray.length != 3) {
		// alert('日期格式错误');
		return false;
	}

	intYear = parseInt(strDateArray[0], 10);
	intMonth = parseInt(strDateArray[1], 10);
	intDay = parseInt(strDateArray[2], 10);

	if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) {
		// alert('日期格式错误');
		return false;
	}

	if (intMonth > 12 || intMonth < 1) {
		// alert('日期格式错误');
		return false;
	}

	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intDay > 31 || intDay < 1)) {
		// alert('日期格式错误');
		return false;
	}

	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intDay > 30 || intDay < 1)) {
		// alert('日期格式错误');
		return false;
	}

	if (intMonth == 2) {
		if (intDay < 1) {
			// alert('日期格式错误');
			return false;
		}

		boolLeapYear = false;
		if ((intYear % 100) == 0) {
			if ((intYear % 400) == 0)
				boolLeapYear = true;
		} else {
			if ((intYear % 4) == 0)
				boolLeapYear = true;
		}

		if (boolLeapYear) {
			if (intDay > 29) {
				// alert('日期格式错误');
				return false;
			}
		} else {
			if (intDay > 28) {
				// alert('日期格式错误');
				return false;
			}
		}
	}

	return true;
}

commonUtils.isNull = function(str) {
		if (!str) {
			// null or undefined or NaN
			return true;
		}
		if (str.hasOwnProperty("value")) {
			if (!str.value) {
				return true;
			}
		}
		return false;
};
```

**更新列表：**

*



**参考文章：**

* [javascript判断日期格式是否正确][1]
* [js学习分享：[4]js验证日期格式 时间格式][2]

[1]: https://blog.csdn.net/dallasnash/article/details/1569068
[2]: https://jingyan.baidu.com/article/a378c960a6422ab328283089.html