---
layout: post
title: Sublime Text使用
categories: SublimeText
lastUpdated: FILE_CHANGED_ON = '2016-05-23 17:24:33'
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

### 工具概述(Overview )


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

### 下载安装(Installation)

* 下载地址：[Sublime Text 3][2]，选择相应平台版本进行下载安装
* 购买（Purchase）

    Sublime Text是一个收费闭源软件，可以在[这里][3]购买。

    不过不购买Sublime Text也可以“正常”使用它，只是Sublime Text会时不时的弹出一个对话框提醒你购买，此外窗口处会有一个很屌丝很low逼的(UNREGISTERED)。（在高频操作下，一般20分钟提示一次，个人认为算是很厚道了）

### 基础配置

* 默认配置：Preferences | Settings - Default
* 自定义配置：Preferences | Settings - User

    ```json
    {
      "caret_style": "phase",
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

* 新建：`Ctrl + N`
* 切换语法：`Ctrl + Shift + P` -> `Set Syntax: [语法]`
* 同时选中html的开始和结束标签进行编辑：光标移到一个标签行上按`Ctrl+Shift+'`
* 选择单词：`Ctrl + D`
* 逐个选择：`Ctrl + Shift ←/→`
* 复制新增当前行下移：`Ctrl + Shift + D`
* 选择行：`Ctrl + L`
* 下起一行：`Ctrl + Enter`
* 上起一行：`Ctrl + Shift + Enter`
* 当前行上下移动：`Ctrl + Shift + ↑/↓`
* 向左/右缩进：'Ctrl + [/]'
* 以当前缩进粘贴：'Ctrl + Shift + V'
* 删除行：`Ctrl + X`
* 返回上/下一个光标位置：`Alt + - / Alt + Shift + -`
* 切换到上/下一个视图：`Ctrl + Tab / Ctrl + Shift + Tab`
* 多行合成一行：`Ctrl + J`


### 进阶使用

* 自定义Snippet代码片段
    Tools | New Snippet...

    ```xml
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

    这是一个自带的代码模板，需要做一些修改，比如我们输入p然后按tab后生成`<p></p>`，如果我们要输入p然后生成

    ```html
    <p>
      |
    </p>
    ```

    这样的效果呢，我们改一下代码

    ```xml
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

    保存为html-p.sublime-snippet，然后我们`Ctrl + N`，然后SSHTML设置一下html语法，输入p按tab，然后光标就停留在了$1位置了，$1是一个占位符，它标识了光标出现的位置，但是如果我们的模板很长篇大论，我们需要快速切换到模板需要手动输入的位置时，怎么办呢，对了，就是可以用$n来为我们服务，比如我们修改p模板如下

    ```xml
    <snippet>
      <content><![CDATA[
      <p>
        $1
      </p>
      <p>
        $2
      </p>
      <p>
        $3
      </p>
      ]]>
      </content>
      <tabTrigger>p</tabTrigger>
      <scope>text.html</scope>
    </snippet>
    ```

    然后我们`Ctrl + N`，然后SSHTML设置一下html语法，输入p按tab，然后光标就停留在了$1位置了，输入div1，然后按tab，光标就跑到$2位置了，输入div2，按tab，光标就到$3位置了，非常方便，如果我们要联动更改呢，很简单，只要在不同的位置使用相同的$n占位符即可，比如下面的代码

    ```xml
    <snippet>
      <content><![CDATA[
      <!DOCTYPE html>
      <html>
      <head>
        <title>$1</title>
      </head>
      <body>
        <p>$1</p>
      </body>
      </html>
      ]]>
      </content>
      <tabTrigger>html</tabTrigger>
      <scope>text.html</scope>
    </snippet>
    ```
    
    保存为html-doctype.sublime-snippet，然后我们`Ctrl + N`，然后SSHTML设置一下html语法，输入html按tab，然后光标就在`<title></title>`和`<p></p>`之间同时闪动了，这就达到联动修改的效果了。

    ![snippet1](/images/snippet1.gif)

    我们的模板代码是可以加入默认值的，格式很简单${1:Placeholder}，而且还可以嵌套哦${1:Nested ${2:Placeholder}}

* 自定义插件
    Tools | New Plugin...

    ```python
    import sublime, sublime_plugin

    class ExampleCommand(sublime_plugin.TextCommand):
      def run(self, edit):
        self.view.insert(edit, 0, "Hello, World!")
    ```

    这是自动生成的模板，假如我们现在要写一个生成日期的插件，可以修改为如下代码

    ```python
    import sublime, sublime_plugin
    from datetime import datetime
    import time

    class TimestampCommand(sublime_plugin.EventListener):
        """Expand `isoD`, `now`, `datetime`, `utcnow`, `utcdatetime`,
           `date` and `time`
        """
        def on_query_completions(self, view, prefix, locations):
            if prefix in ('isoD', 'now', 'datetime'):
                val = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
            elif prefix in ('utcnow', 'utcdatetime'):
                val = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S')
            elif prefix == 'date':
                val = datetime.now().strftime("%y-%m-%d")
            elif prefix == 'time':
                val = str(int(time.time()))
            else:
                val = None

            return [(prefix, prefix, val)] if val else []
    ```

    然后我们保存为timestamp.py，试试效果

    ![date](/images/date.gif)

    然而，如果并不想要·YYYY-mm-dd·效果呢，而是想要·YYYY-(+)m-(+)d·效果，查了一下[文档][10]，发现这个语法`%-m和%-d`可以去掉填充的0，但是在win7上并没有效果，于是继续查，最后有一法可用

    ```python
    val = '{d.year}-{d.month}-{d.day}'.format(d=datetime.now())
    ```

    ![date2](/images/date2.gif)

### 高级特性

* 实时打印当前操作的命令，可以使用`Ctrl + &#180;`，然后输入`sublime.log_commands(True)`回车进行启动监控

### 总结提高


**更新列表：**

* 2016-5-23



**参考文章：**

* [Sublime Text3 Help][1]
* [Sublime Text 全程指南][4]
* [如何优雅地使用Sublime Text][5]
* [Sublime Text 有哪些使用技巧？][6]
* [Sublime Text3 Help][7]
* [Sublime Text 2 - 性感无比的代码编辑器！程序员必备神器！跨平台支持Win/Mac/Linux][8]
* [Quickly Insert Text & Code with Sublime Text Snippets][9]
* [strftime][10]
* [python-datetime-formatting-without-zero-padding][11]
* [Insert current timestamp into Sublime Text][12]


[1]: http://docs.sublimetext.info/en/latest/
[2]: http://www.sublimetext.com/3
[3]: https://www.sublimetext.com/buy
[4]: http://zh.lucida.me/blog/sublime-text-complete-guide/
[5]: http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/
[6]: https://www.zhihu.com/question/24896283?rf=19976788
[7]: http://sublimetext.info/docs/en/index.html
[8]: http://www.iplaysoft.com/sublimetext.html
[9]: http://www.granneman.com/webdev/editors/sublime-text/top-features-of-sublime-text/quickly-insert-text-and-code-with-sublime-text-snippets/
[10]: http://strftime.org/
[11]: http://stackoverflow.com/questions/9525944/python-datetime-formatting-without-zero-padding
[12]: http://kevinmorey.com/post/84828796419/insert-current-timestamp-into-sublime-text