---
layout: post
title: sublime text设置不识别拓展名的默认语法
categories: SublimeText
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

`sublime text` 支持大部分的后缀语法高亮，但还有一些不识别的，我们可以动手设置它为`sublime text`支持的格式。

我们拿`.less`后缀来说吧，默认是不支持语法高亮的，其实它是css文件，那么我们要设置为css语法：

* 用`sublime text`打开之后，右下角看到它的语法是`Plain Text`，就是简单的文本，和系统的文本编辑器是一样

* 单击`Plain Text`，选择`Open all with current extension as...`，选择CSS即可

* 说明：`sublime text`会在`C:\Users\Administrator\AppData\Roaming\Sublime Text 3\Packages\User`生成一个`CSS.sublime-settings`文件，内容如下

```json
{
  "extensions":
  [
    "less"
  ]
}
```

**参考文章：**

* [在sublime text中设置某种扩展名文件的默认语法][1]


[1]: http://shashanzhao.com/archives/971.html
