---
layout: post
title: Sublime Text使用
categories: SublimeText
lastUpdated: 
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1. [工具概述](#工具概述)
2. [下载安装](#下载安装)
3. [基础配置](#基础配置)
4. [常用功能](#常用功能)
5. [进阶使用](#进阶使用)
6. [高级特性](#高级特性)
7. [总结提高](#总结提高)

### 工具概述

* 随意跳转，实时响应变化
    * `Ctrl + P`：输入文件名，实时预览内容，回车打开，↑↓预览其他，有自动完成提示
    * `Ctrl + P`：输入@+标记，实时跳到相应内容，可简写首字母组合，有自动完成提示
    * `Ctrl + P`：输入#+字符，实时跳到相应内容，有自动完成提示
    * `Ctrl + P`：输入:+行号，实时跳到相应行
* 强大的多行选择和多行编辑，实时响应变化  
    每行输入一个星期，把他们都选上，按`Ctrl + Shift + L`，然后输入双引号，按End然后输入逗号(,)，按`Ctrl+J`排放在一行，按`Ctrl + L`选择一行，`Shift + ←`去选换行符，按[加数组标识，按`Home`，回到行首，定义变量名称
* 无所不能的命令板  
    只要按`Ctrl + Shift + P`调出这个板，输入模糊的记忆，就能调取你想设置的功能窗
* 全屏自由无干扰模式(`Shift + F11`,再按一次退出该模式)  
    隐藏菜单栏：`View | Hide Menu`，显示菜单栏：按`Ctrl + Shift + P`，输入`vmenu`
* 拆分编辑，像视频多监控区域一样，多区域编辑，支持四个区域  
    `View | Layout`设定行列Grid模式，或`File | New View into File`，然后拖拽标签页到区域
* 语法高亮、代码提示补全、代码折叠、自定义皮肤/配色方案、多便签页
* 自定义Anything  
    可以自定义按键绑定，菜单栏，代码片段/模板，宏定义，自动完成和更多内容
* 插件API  
    基于Python的插件API，实时构建，实时预览，还能自由安装卸载插件
* 跨平台(OS X, Windows and Linux)  
    一个license多平台使用

### 下载安装

* 下载地址：[Sublime Text 3][2]，选择相应平台版本进行下载安装
* 购买（Purchase）

    Sublime Text是一个收费闭源软件，可以在[这里][3]购买。

    不过不购买Sublime Text也可以“正常”使用它，只是Sublime Text会时不时的弹出一个对话框提醒你购买，此外窗口处会有一个很屌丝很low逼的(UNREGISTERED)。（在高频操作下，一般20分钟提示一次，个人认为算是很厚道了）

### 基础配置

* 默认配置：Preferences | Settings - Default
* 自定义配置：Preferences | Settings - User

    ```json
    {
      "caret_style": "phase"
      "default_encoding": "UTF-8",
      "ensure_newline_at_eof_on_save": true,
      "font_size": 12,
      "highlight_line": true,
      "tab_size": 2,
      "translate_tabs_to_spaces": true,
      "trim_trailing_white_space_on_save": true
    }
    ```  
    保存位置：`Packages/User/Preferences.sublime-settings`

### 常用功能

Sublime Text是一个非常强大的

* 新建：`Ctrl + N`
* 切换语法：`Ctrl + Shift + P` -> `Set Syntax: [语法]`
* 同时选中html的开始和结束标签进行编辑：光标移到一个标签行上按`Ctrl+Shift+'`
* 选择单词：`Ctrl + D`
* 复制新增当前行下移：`Ctrl + Shift + D`
* 选择行：`Ctrl + L`
* 下起一行：`Ctrl + Enter`
* 上起一行：`Ctrl + Shift + Enter`
* 当前行上下移动：`Ctrl + Shift + ↑/↓`
* 向左/右缩进：'Ctrl + [/]'
* 以当前缩进粘贴：'Ctrl + Shift + V'
* 
* 
* 
* 
* 
* 


### 进阶使用

* 自定义Snippet代码片段
    Tools | New Snippet...

    ```
    <snippet>
      <content><![CDATA[
      Hello, ${1:this} is a ${2:snippet}.
      ]]></content>
      <!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
      <!-- <tabTrigger>hello</tabTrigger> -->
      <!-- Optional: Set a scope to limit where the snippet will trigger -->
      <!-- <scope>source.python</scope> -->
    </snippet>
    ```

    这是一个自带的代码模板，需要做一些修改，比如我们输入p然后按tab后生成<p></p>，如果我们要输入p然后生成

    ```html
    <p>
      |
    </p>
    ```

    这样的效果呢，我们改一下代码

    ```
    <snippet>
      <content><![CDATA[
      <p>
        $1
      </p>
      ]]>
      </content>
      <tabTrigger>p</tabTrigger>
      <scope>text.html</scope>
    </snippet>
    ```

    保存为html-p.sublime-snippet，然后我们`Ctrl + N`，然后SSHTML设置一下html语法，输入p按tab即可得到想要的效果了。

### 高级特性
### 总结提高


**更新列表：**

* 2016-5-21



**参考文章：**

* [Sublime Text Help][1]


[1]: http://sublimetext.info/docs/en/index.html
[2]: http://www.sublimetext.com/3
[3]: https://www.sublimetext.com/buy
