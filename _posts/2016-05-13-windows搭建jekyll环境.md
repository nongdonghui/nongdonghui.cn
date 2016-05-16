---
layout: post
title: windows搭建jekyll环境
categories: jekyll
lastUpdated: 5.14更新
---

## {{ page.title }}

{{ page.date  |  date: "%Y.%-m.%-d" }} - 南京  |  <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

* 安装 Ruby [下载地址][6]  
注意安装过程要勾选的，请全选

确保安装成功

```
C:\Users\Administrator>ruby -v
ruby 2.3.0p0 (2015-12-25 revision 53290) [x64-mingw32]
```

* 安装 Ruby DevKit [下载地址][6]  
这是一个exe压缩包，把它解压到`C:\RubyDevKit`目录下，接着初始化安装

初始化命令：

```
cd C:\RubyDevKit
ruby dk.rb init
```

注意，一定要在开始，输入cmd然后打开的命令行，命令跳转到该目录进行初始化；而且init后不能有分号，下面是我的init及install过程

```
C:\RubyDevKit>ruby dk.rb init;

Configures an MSYS/MinGW based Development Kit (DevKit) for
each of the Ruby installations on your Windows system. The
DevKit enables you to build many of the available native
RubyGems that don't yet have a binary gem.

Usage: ruby dk.rb COMMAND [options]

where COMMAND is one of:

  init     prepare DevKit for installation
  review   review DevKit install plan
  install  install required DevKit executables

and 'install' [options] are:

  -f, --force  overwrite existing helper scripts
```

把末尾的分号去掉，继续

```
C:\RubyDevKit>ruby dk.rb init

Initialization complete! Please review and modify the auto-generated
'config.yml' file to ensure it contains the root directories to all
of the installed Rubies you want enhanced by the DevKit.
```

初始化完成，install一下

```
C:\RubyDevKit>ruby dk.rb install
Invalid configuration or no Rubies listed. Please fix 'config.yml'
and rerun 'ruby dk.rb install'
```

打开config.yml，然后添加相应的ruby目录

```
- C:/Ruby23-x64
```

保存，最后我的config.yml是这样

```
......
# Example:
#
# ---
# - C:/ruby19trunk
# - C:/ruby192dev
#
---
- C:/Ruby23-x64
```

关闭cmd窗口重新打开，继续运行命令

```
C:\RubyDevKit>ruby dk.rb install
[INFO] Updating convenience notice gem override for 'C:/Ruby23-x64'
[INFO] Installing 'C:/Ruby23-x64/lib/ruby/site_ruby/devkit.rb'
```

注意：如果你为了节省时间，在RubyDevKit文件夹上右键-在此处打开命令窗口，然后输入命令，是这么一个结果

```
C:\RubyDevKit>ruby dk.rb install
'ruby' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

* 安装 Jekyll

确保gem已经正确安装

```
C:\Users\Administrator>gem -v
2.5.1
```

安装 Jekyll

```
C:\Users\Administrator>gem install jekyll
Fetching: safe_yaml-1.0.4.gem (100%)
Successfully installed safe_yaml-1.0.4
Fetching: rouge-1.10.1.gem (100%)
Successfully installed rouge-1.10.1
Fetching: mercenary-0.3.6.gem (100%)
Successfully installed mercenary-0.3.6
Fetching: liquid-3.0.6.gem (100%)
Successfully installed liquid-3.0.6
Fetching: kramdown-1.11.1.gem (100%)
Successfully installed kramdown-1.11.1
Fetching: ffi-1.9.10-x64-mingw32.gem ( 12%)ERROR:  While executing gem ... (Gem::RemoteFetcher::Fetc
hError)
    Errno::ECONNRESET: An existing connection was forcibly closed by the remote host. - SSL_connect
(https://api.rubygems.org/gems/ffi-1.9.10-x64-mingw32.gem)

重复运行这条命令gem install jekyll直到出现如下的成功提示

C:\Users\Administrator>gem install jekyll
Fetching: ffi-1.9.10-x64-mingw32.gem (100%)
Successfully installed ffi-1.9.10-x64-mingw32
Fetching: rb-inotify-0.9.7.gem (100%)
Successfully installed rb-inotify-0.9.7
Fetching: rb-fsevent-0.9.7.gem (100%)
Successfully installed rb-fsevent-0.9.7
Fetching: listen-3.0.7.gem (100%)
Successfully installed listen-3.0.7
Fetching: jekyll-watch-1.4.0.gem (100%)
Successfully installed jekyll-watch-1.4.0
Fetching: sass-3.4.22.gem (100%)
Successfully installed sass-3.4.22
Fetching: jekyll-sass-converter-1.4.0.gem (100%)
Successfully installed jekyll-sass-converter-1.4.0
Fetching: colorator-0.1.gem (100%)
Successfully installed colorator-0.1
Fetching: jekyll-3.1.3.gem (100%)
Successfully installed jekyll-3.1.3
Parsing documentation for ffi-1.9.10-x64-mingw32
Installing ri documentation for ffi-1.9.10-x64-mingw32
Parsing documentation for rb-inotify-0.9.7
Installing ri documentation for rb-inotify-0.9.7
Parsing documentation for rb-fsevent-0.9.7
Installing ri documentation for rb-fsevent-0.9.7
Parsing documentation for listen-3.0.7
Installing ri documentation for listen-3.0.7
Parsing documentation for jekyll-watch-1.4.0
Installing ri documentation for jekyll-watch-1.4.0
Parsing documentation for sass-3.4.22
Installing ri documentation for sass-3.4.22
Parsing documentation for jekyll-sass-converter-1.4.0
Installing ri documentation for jekyll-sass-converter-1.4.0
Parsing documentation for colorator-0.1
Installing ri documentation for colorator-0.1
Parsing documentation for jekyll-3.1.3
Installing ri documentation for jekyll-3.1.3
Done installing documentation for ffi, rb-inotify, rb-fsevent, listen, jekyll-watch, sass, jekyll-sa
ss-converter, colorator, jekyll after 32 seconds
9 gems installed
```

等待过程比较漫长，可能会超过半小时哦

现在可以把你的`name.github.io`运行起来了，先clone到本地，然后命令行进入目录，执行

```
E:\myApp\nongdonghui.github.io>jekyll -server -auto
jekyll 3.1.3  |  Error:  Whoops, we can't understand your command.
jekyll 3.1.3  |  Error:  invalid option: -auto
jekyll 3.1.3  |  Error:  Run your command again with the --help switch to see available options.
```

不能识别命令，查看一下帮助

```
E:\myApp\nongdonghui.github.io>jekyll --help
jekyll 3.1.3 -- Jekyll is a blog-aware, static site generator in Ruby

Usage:

  jekyll \<subcommand\> [options]

Options:
        -s, --source [DIR]  Source directory (defaults to ./)
        -d, --destination [DIR]  Destination directory (defaults to ./_site)
            --safe         Safe mode (defaults to false)
        -p, --plugins PLUGINS_DIR1[,PLUGINS_DIR2[,...]]  Plugins directory (defaults to ./_plugins)
            --layouts DIR  Layouts directory (defaults to ./_layouts)
            --profile      Generate a Liquid rendering profile
        -h, --help         Show this message
        -v, --version      Print the name and version
        -t, --trace        Show the full backtrace when an error occurs

Subcommands:
  docs
  import
  build, b              Build your site
  clean                 Clean the site (removes site output and metadata file) without building.
  doctor, hyde          Search site and print specific deprecation warnings
  help                  Show the help message, optionally for a given subcommand.
  new                   Creates a new Jekyll site scaffold in PATH
  serve, server, s      Serve your site locally
```

```
E:\myApp\nongdonghui.github.io>jekyll serve
Configuration file: E:/myApp/nongdonghui.github.io/_config.yml
       Deprecation: The 'pygments' configuration option has been renamed to 'highlighter'. Please up
date your config file accordingly. The allowed values are 'rouge', 'pygments' or null.
            Source: E:/myApp/nongdonghui.github.io
       Destination: E:/myApp/nongdonghui.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
  Dependency Error: Yikes! It looks like you don't have redcarpet or one of its dependencies install
ed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error
message from Ruby is: 'cannot load such file -- redcarpet' If you run into trouble, you can find hel
pful resources at http://jekyllrb.com/help/!
  Conversion error: Jekyll::Converters::Markdown encountered an error while converting '_posts/2015-
12-04-SVN更新冲突解释.md':
                    redcarpet
             ERROR: YOUR SITE COULD NOT BE BUILT:
                    ------------------------------------
                    redcarpet
```

首先是`pygments`变量已经过时，已经用`highlighter`代替，值有2项可选`['rouge', 'pygments']`，改一下；还有就是`gem`没有安装相应的`redcarpet`插件，安装它

```
E:\myApp\nongdonghui.github.io>gem install redcarpet
Fetching: redcarpet-3.3.4.gem (100%)
Temporarily enhancing PATH to include DevKit...
Building native extensions.  This could take a while...
Successfully installed redcarpet-3.3.4
Parsing documentation for redcarpet-3.3.4
Installing ri documentation for redcarpet-3.3.4
Done installing documentation for redcarpet after 2 seconds
1 gem installed
```

安装后重新执行启动语句

```
E:\myApp\nongdonghui.github.io>jekyll serve
Configuration file: E:/myApp/nongdonghui.github.io/_config.yml
            Source: E:/myApp/nongdonghui.github.io
       Destination: E:/myApp/nongdonghui.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
  Dependency Error: Yikes! It looks like you don't have pygments or one of its dependencies installe
d. In order to use Jekyll as currently configured, you'll need to install this gem. The full error m
essage from Ruby is: 'cannot load such file -- pygments' If you run into trouble, you can find helpf
ul resources at http://jekyllrb.com/help/!
  Conversion error: Jekyll::Converters::Markdown encountered an error while converting '_posts/2015-
12-04-SVN更新冲突解释.md':
                    pygments
             ERROR: YOUR SITE COULD NOT BE BUILT:
                    ------------------------------------
                    pygments
```

提示pygments依赖没有安装，那就安装它

```
E:\myApp\nongdonghui.github.io>gem install pygments.rb
ERROR:  While executing gem ... (Gem::RemoteFetcher::UnknownHostError)
    timed out (https://api.rubygems.org/quick/Marshal.4.8/pygments.rb-0.6.3.gemspec.rz)

重复运行这条命令gem install pygments.rb直到出现如下的成功提示

E:\myApp\nongdonghui.github.io>gem install pygments.rb
Fetching: posix-spawn-0.3.11.gem (100%)Fetching: posix-spawn-0.3.11.gem
Temporarily enhancing PATH to include DevKit...
Building native extensions.  This could take a while...
Successfully installed posix-spawn-0.3.11
Fetching: pygments.rb-0.6.3.gem (100%)Fetching: pygments.rb-0.6.3.gem
Successfully installed pygments.rb-0.6.3
Parsing documentation for posix-spawn-0.3.11
Installing ri documentation for posix-spawn-0.3.11
Parsing documentation for pygments.rb-0.6.3
Installing ri documentation for pygments.rb-0.6.3
Done installing documentation for posix-spawn, pygments.rb after 2 seconds
2 gems installed
```

再次运行

```
E:\myApp\nongdonghui.github.io>jekyll serve
Configuration file: E:/myApp/nongdonghui.github.io/_config.yml
            Source: E:/myApp/nongdonghui.github.io
       Destination: E:/myApp/nongdonghui.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
     Build Warning: Layout 'nil' requested in atom.xml does not exist.
                    done in 5.453 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'E:/myApp/nongdonghui.github.io'
Configuration file: E:/myApp/nongdonghui.github.io/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2016-05-13 17:43:07] ERROR `/favicon.ico' not found.
```

在浏览器打开http://127.0.0.1:4000就会看到你的主页了，现在可以在本地修改预览好了再提交到服务器了。让我们试着修改一下，保存，看控制台是怎么提示的

```
Regenerating: 1 file(s) changed at 2016-05-13 17:44:38      Build Warning: Layout 'nil' requested in atom.xml does not exist.
```

提示说重新自动生成了，但是没有找到atom.xml文件内的nil这个布局，而且浏览器界面没有自动实时刷新最新内容，需要手动刷新。

我们把它的布局设置为`default`然后保存看看

```
Regenerating: 1 file(s) changed at 2016-05-13 17:52:03 ...done in 2.111409 seconds.
```

启动的时候有如下提示：

```
Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
```

那我们就顺示而为，安装它

```
E:\myApp\nongdonghui.github.io>gem install wdm
ERROR:  While executing gem ... (Gem::RemoteFetcher::FetchError)
    Errno::ECONNRESET: An existing connection was forcibly closed by the remote host. - SSL_connect
(https://api.rubygems.org/quick/Marshal.4.8/wdm-0.1.1.gemspec.rz)

重复运行这条命令gem install wdm直到出现如下的成功提示

E:\myApp\nongdonghui.github.io>gem install wdm
Fetching: wdm-0.1.1.gem (100%)
Temporarily enhancing PATH to include DevKit...
Building native extensions.  This could take a while...
Successfully installed wdm-0.1.1
Parsing documentation for wdm-0.1.1
Installing ri documentation for wdm-0.1.1
Done installing documentation for wdm after 0 seconds
1 gem installed
```

再次运行，没有提示了

```
E:\myApp\nongdonghui.github.io>jekyll s
Configuration file: E:/myApp/nongdonghui.github.io/_config.yml
            Source: E:/myApp/nongdonghui.github.io
       Destination: E:/myApp/nongdonghui.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 2.605 seconds.
 Auto-regeneration: enabled for 'E:/myApp/nongdonghui.github.io'
Configuration file: E:/myApp/nongdonghui.github.io/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

修改一下文件内容，保存看看效果

```
Regenerating: 1 file(s) changed at 2016-05-13 18:09:29 ...done in 1.870219 seconds.
```

**更新列表：**

* 2016-5-13

经过调试，发现有一些包含中文的是找不到页面的，在\_config.yml添加了`encoding: utf-8`也是找不到页面

```
E:\myApp\nongdonghui.github.io>jekyll s
......
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2016-05-14 11:36:36] ERROR `/java/2016/05/11/Jersey和SpringMVC返回对象类型.html' not found.
```

试试过用修改cmd的console的编码为utf-8

```
Active code page: 65001

C:\Users\Administrator>e:

E:\>cd E:\myApp\nongdonghui.github.io

E:\myApp\nongdonghui.github.io>jekyll s -w
......
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2016-05-14 11:58:51] ERROR `/java/2016/05/11/Jerseyéœå­²pringMVCæ©æ–¿æ´–ç€µç¡…è–„ç»«è¯²ç€·.html' not found.
[2016-05-14 11:58:51] ERROR Errno::EAGAIN: Resource temporarily unavailable @ io_write - <STDOUT>
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/log.rb:78:in `write'
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/log.rb:78:in `<<'
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/log.rb:78:in `log'
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/log.rb:153:in `log'
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/log.rb:91:in `error'
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/httpserver.rb:100:in `rescue in run'
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/httpserver.rb:115:in `run'
        C:/Ruby23-x64/lib/ruby/2.3.0/webrick/server.rb:296:in `block in start_thread'
[2016-05-14 11:59:29] ERROR `/éŽ¯è™«ç¡¶/2016/05/12/ç»¯è¤ç²ºéŽ¬Ñƒî„Ÿæ¶”çŠµæ®‘éžå—šÐ’.html' not found.
```

参考了[cpcp][8]发现根本就没有gbk的


|  Code page  |  Country/ Region/ Language  |
|  ---------  |  -------------------------  |
|  437  |  United States  |
|  850  |  Multilingual (Latin I)  |
|  852  |  Slavic (Latin II)  |
|  855  |  Cyrillic (Russian)  |
|  857  |  Turkish  |
|  859  |  Portuguese  |
|  861  |  Icelandic  |
|  862  |  Canadian-French  |
|  865  |  Nordic  |
|  866  |  Russian  |
|  869  |  Modern Greek  |
|  1252  |  West European Latin  |
|  65000  |  UTF-7 *  |
|  65001  |  UTF-8 *  |

还参考了[jekyllrb][9]，用如下命令新建一个jekyll站点

```sh
~ $ gem install jekyll
~ $ jekyll new my-awesome-site
~ $ cd my-awesome-site
~/my-awesome-site $ jekyll serve
# => Now browse to http://localhost:4000
```

结果还是

```
Not Found

`/java/2016/05/11/Jerseyå’ŒSpringMVCè¿”å›žå¯¹è±¡ç±»åž‹.html' not found.
WEBrick/1.3.1 (Ruby/2.3.0/2015-12-25) at 127.0.0.1:4000

以下是控制台没有使用Active code page: 65001转utf-8的提示

[2016-05-14 13:01:45] ERROR `/java/2016/05/11/Jersey和SpringMVC返回对象类型.html' not found.
```

**参考文章：**

* [Run Jekyll on Windows][7]
* ["cannot load ... redcarpet" running Jekyll locally #8][1]
* [Jekyll serve didnt work: It looks like you don't have pygments or one of its dependencies installed][2]
* [Windows下安装Ruby和Jekyll][3]
* [在Windows上搭建Jekyll写作环境][4]
* [jekyll 部署记录][5]

[1]: https://github.com/LightTable/lighttable.com/issues/8
[2]: http://stackoverflow.com/questions/33439019/jekyll-serve-didnt-work-it-looks-like-you-dont-have-pygments-or-one-of-its-dep
[3]: http://blog.csdn.net/qiujuer/article/details/44620019
[4]: http://blog.fooleap.org/run-jekyll-on-windows.html
[5]: http://blog.leanote.com/post/551ab4c438f41114e80014af
[6]: http://rubyinstaller.org/downloads
[7]: http://jekyll-windows.juthilo.com
[8]: http://ss64.com/nt/chcp.html
[9]: http://jekyllrb.com/