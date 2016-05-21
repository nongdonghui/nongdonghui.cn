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
* 多重(行/列)选择，实时响应变化  
    每行输入一个星期，把他们都选上，按`Ctrl+Shift+L`，然后输入双引号，按End然后输入逗号(,)，按`Ctrl+J`排放在一行，按`Ctrl+L`选择一行，`Shift+←`去选换行符，按[加数组标识，按`Home`，回到行首，定义变量名称
* 命令行万能框  
    只要按`Ctrl+Shift+P`调出这个万能框，输入模糊的记忆，就能调取你想设置的功能窗
* 全屏自由无干扰模式(`Shift+F11`,再按一次退出该模式)  
    隐藏菜单栏：`View/Hide Menu`，显示菜单栏：按`Ctrl+Shift+P`，输入`vmenu`
* 拆分编辑，像视频多监控区域一样，多区域编辑，支持四个区域  
    `View/Layout`设定行列Grid模式，或`File/New View into File`，然后拖拽标签页到区域
* 实时项目切换
* 自定义Anything  
    可以自定义按键绑定，菜单栏，代码片段/模板，宏定义，自动完成和更多内容
* 插件API  
    基于Python的插件API，实时构建，实时预览，还能自由安装卸载插件
* 跨平台(OS X, Windows and Linux)  
    一个license多平台使用

### 下载安装

* 下载地址：[Sublime Text 3][2]，选择相应平台版本进行下载安装

### 基础配置

* 默认配置：Preferences/Settings - Default
* 自定义配置：Preferences/Settings - User

    ```json
    {
      "default_encoding": "UTF-8",
      "font_size": 12,
      "highlight_line": true,
      "tab_size": 2,
      "translate_tabs_to_spaces": true,
      "trim_trailing_white_space_on_save": true,
      "update_check": false
    }
    ```  
    保存位置：`Packages/User/Preferences.sublime-settings`

### 常用功能
### 进阶使用
### 高级特性
### 总结提高


**更新列表：**

* 2016-5-21



**参考文章：**

* [Sublime Text Help][1]


[1]: http://sublimetext.info/docs/en/index.html
[2]: http://www.sublimetext.com/3
