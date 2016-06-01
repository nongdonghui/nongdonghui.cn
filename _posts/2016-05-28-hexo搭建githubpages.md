---
layout: post
title: hexo搭建github pages
categories: github
lastUpdated: 5.31
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.npm安装hexo

命令：`$ npm install hexo -g`

执行过程

```
Microsoft Windows [版本 6.1.7601]
版权所有 (c) 2009 Microsoft Corporation。保留所有权利。

C:\Users\Administrator>npm install hexo -g
npm WARN optional dep failed, continuing fsevents@1.0.12
npm WARN optional dep failed, continuing fsevents@1.0.12
npm WARN deprecated cross-spawn-async@2.2.4: cross-spawn no longer requires a build toolchain, use i
t instead!

> spawn-sync@1.0.15 postinstall C:\Users\Administrator\AppData\Roaming\npm\node_modules\hexo\node_mo
dules\hexo-util\node_modules\cross-spawn\node_modules\spawn-sync
> node postinstall


> hexo-util@0.5.3 postinstall C:\Users\Administrator\AppData\Roaming\npm\node_modules\hexo\node_modu
les\hexo-util
> npm run build:highlight

|
> hexo-util@0.5.3 build:highlight C:\Users\Administrator\AppData\Roaming\npm\node_modules\hexo\node_
modules\hexo-util
> node scripts/build_highlight_alias.js > highlight_alias.json


> dtrace-provider@0.6.0 install C:\Users\Administrator\AppData\Roaming\npm\node_modules\hexo\node_mo
dules\hexo-log\node_modules\bunyan\node_modules\dtrace-provider
> node scripts/install.js

C:\Users\Administrator\AppData\Roaming\npm\hexo -> C:\Users\Administrator\AppData\Roaming\npm\node_m
odules\hexo\bin\hexo
hexo@3.2.0 C:\Users\Administrator\AppData\Roaming\npm\node_modules\hexo
├── pretty-hrtime@1.0.2
├── hexo-front-matter@0.2.2
├── abbrev@1.0.7
├── archy@1.0.0
├── titlecase@1.1.2
├── text-table@0.2.0
├── tildify@1.2.0 (os-homedir@1.0.1)
├── strip-indent@1.0.1 (get-stdin@4.0.1)
├── hexo-i18n@0.2.1 (sprintf-js@1.0.3)
├── bluebird@3.4.0
├── moment-timezone@0.5.4
├── chalk@1.1.3 (escape-string-regexp@1.0.5, ansi-styles@2.2.1, supports-color@2.0.0, has-ansi@2.
0.0, strip-ansi@3.0.1)
├── minimatch@3.0.0 (brace-expansion@1.1.4)
├── swig-extras@0.0.1 (markdown@0.5.0)
├── js-yaml@3.6.1 (esprima@2.7.2, argparse@1.0.7)
├── hexo-cli@1.0.1 (object-assign@4.1.0, minimist@1.2.0)
├── moment@2.11.2
├── swig@1.4.2 (optimist@0.6.1, uglify-js@2.4.24)
├── hexo-fs@0.1.5 (escape-string-regexp@1.0.5, graceful-fs@4.1.4, chokidar@1.5.1)
├── nunjucks@2.4.2 (asap@2.0.4, yargs@3.32.0, chokidar@1.5.1)
├── hexo-util@0.5.3 (striptags@2.1.1, html-entities@1.2.0, camel-case@1.2.2, cross-spawn@2.2.3, h
ighlight.js@9.4.0)
├── hexo-log@0.1.2 (bunyan@1.8.1)
├── lodash@4.13.1
├── warehouse@2.2.0 (graceful-fs@4.1.4, is-plain-object@2.0.1, JSONStream@1.1.1, cuid@1.3.8)
└── cheerio@0.20.0 (entities@1.1.1, dom-serializer@0.1.0, css-select@1.2.0, htmlparser2@3.8.3, js
dom@7.2.2)

C:\Users\Administrator>
C:\Users\Administrator>
```

2.简单发布

命令

```
$ hexo init blog
$ cd blog
$ npm install
$ hexo serve
```

执行过程

```
C:\Users\Administrator>cd C:\Users\Administrator\Desktop\blog

C:\Users\Administrator\Desktop\blog>hexo init blog
INFO  Cloning hexo-starter to ~\Desktop\blog\blog
Cloning into 'C:\Users\Administrator\Desktop\blog\blog'...
remote: Counting objects: 53, done.
remote: Total 53 (delta 0), reused 0 (delta 0), pack-reused 53
Unpacking objects: 100% (53/53), done.
Checking connectivity... done.
Submodule 'themes/landscape' (https://github.com/hexojs/hexo-theme-landscape.git) registered for pat
h 'themes/landscape'
Cloning into 'themes/landscape'...
remote: Counting objects: 730, done.
remote: Total 730 (delta 0), reused 0 (delta 0), pack-reused 730
Receiving objects: 100% (730/730), 2.51 MiB | 96.00 KiB/s, done.
Resolving deltas: 100% (386/386), done.
Checking connectivity... done.
Submodule path 'themes/landscape': checked out 'decdc2d9956776cbe95420ae94bac87e22468d38'
INFO  Install dependencies
npm WARN deprecated cross-spawn-async@2.2.4: cross-spawn no longer requires a build toolchain, use i
t instead!

> spawn-sync@1.0.15 postinstall C:\Users\Administrator\Desktop\blog\blog\node_modules\hexo-renderer-
marked\node_modules\hexo-util\node_modules\cross-spawn\node_modules\spawn-sync
> node postinstall


> hexo-util@0.5.3 postinstall C:\Users\Administrator\Desktop\blog\blog\node_modules\hexo-renderer-ma
rked\node_modules\hexo-util
> npm run build:highlight

\
> hexo-util@0.5.3 build:highlight C:\Users\Administrator\Desktop\blog\blog\node_modules\hexo-rendere
r-marked\node_modules\hexo-util
> node scripts/build_highlight_alias.js > highlight_alias.json

npm WARN optional dep failed, continuing fsevents@1.0.12
npm WARN optional dep failed, continuing fsevents@1.0.12

> spawn-sync@1.0.15 postinstall C:\Users\Administrator\Desktop\blog\blog\node_modules\hexo\node_modu
les\hexo-util\node_modules\cross-spawn\node_modules\spawn-sync
> node postinstall

|
> dtrace-provider@0.6.0 install C:\Users\Administrator\Desktop\blog\blog\node_modules\hexo\node_modu
les\hexo-log\node_modules\bunyan\node_modules\dtrace-provider
> node scripts/install.js


> hexo-util@0.5.3 postinstall C:\Users\Administrator\Desktop\blog\blog\node_modules\hexo\node_module
s\hexo-util
> npm run build:highlight

\
> hexo-util@0.5.3 build:highlight C:\Users\Administrator\Desktop\blog\blog\node_modules\hexo\node_mo
dules\hexo-util
> node scripts/build_highlight_alias.js > highlight_alias.json

hexo-generator-category@0.1.3 node_modules\hexo-generator-category
├── object-assign@2.1.1
└── hexo-pagination@0.0.2 (utils-merge@1.0.0)

hexo-generator-archive@0.1.4 node_modules\hexo-generator-archive
├── object-assign@2.1.1
└── hexo-pagination@0.0.2 (utils-merge@1.0.0)

hexo-generator-tag@0.2.0 node_modules\hexo-generator-tag
├── object-assign@4.1.0
└── hexo-pagination@0.0.2 (utils-merge@1.0.0)

hexo-generator-index@0.2.0 node_modules\hexo-generator-index
├── object-assign@4.1.0
└── hexo-pagination@0.0.2 (utils-merge@1.0.0)

hexo-renderer-ejs@0.2.0 node_modules\hexo-renderer-ejs
├── object-assign@4.1.0
└── ejs@1.0.0

hexo-server@0.2.0 node_modules\hexo-server
├── object-assign@4.1.0
├── mime@1.3.4
├── bluebird@3.4.0
├── opn@4.0.2 (pinkie-promise@2.0.1)
├── chalk@1.1.3 (escape-string-regexp@1.0.5, ansi-styles@2.2.1, supports-color@2.0.0, strip-ansi@
3.0.1, has-ansi@2.0.0)
├── morgan@1.7.0 (on-headers@1.0.1, basic-auth@1.0.4, depd@1.1.0, debug@2.2.0, on-finished@2.3.0)

├── connect@3.4.1 (utils-merge@1.0.0, parseurl@1.3.1, debug@2.2.0, finalhandler@0.4.1)
├── serve-static@1.10.2 (escape-html@1.0.3, parseurl@1.3.1, send@0.13.1)
└── compression@1.6.2 (on-headers@1.0.1, vary@1.1.0, bytes@2.3.0, debug@2.2.0, compressible@2.0.8
, accepts@1.3.3)

hexo-renderer-stylus@0.3.1 node_modules\hexo-renderer-stylus
├── stylus@0.53.0 (css-parse@1.7.0, debug@2.2.0, sax@0.5.8, source-map@0.1.43, mkdirp@0.5.1, glob
@3.2.11)
└── nib@1.1.0 (stylus@0.49.3)

hexo-renderer-marked@0.2.10 node_modules\hexo-renderer-marked
├── object-assign@4.1.0
├── marked@0.3.5
├── strip-indent@1.0.1 (get-stdin@4.0.1)
└── hexo-util@0.5.3 (striptags@2.1.1, html-entities@1.2.0, bluebird@3.4.0, camel-case@1.2.2, high
light.js@9.4.0, cross-spawn@2.2.3)

hexo@3.2.0 node_modules\hexo
├── hexo-front-matter@0.2.2
├── pretty-hrtime@1.0.2
├── abbrev@1.0.7
├── archy@1.0.0
├── titlecase@1.1.2
├── text-table@0.2.0
├── tildify@1.2.0 (os-homedir@1.0.1)
├── strip-indent@1.0.1 (get-stdin@4.0.1)
├── hexo-i18n@0.2.1 (sprintf-js@1.0.3)
├── bluebird@3.4.0
├── minimatch@3.0.0 (brace-expansion@1.1.4)
├── chalk@1.1.3 (escape-string-regexp@1.0.5, ansi-styles@2.2.1, supports-color@2.0.0, has-ansi@2.
0.0, strip-ansi@3.0.1)
├── moment-timezone@0.5.4
├── swig-extras@0.0.1 (markdown@0.5.0)
├── js-yaml@3.6.1 (esprima@2.7.2, argparse@1.0.7)
├── hexo-cli@1.0.1 (object-assign@4.1.0, minimist@1.2.0)
├── swig@1.4.2 (optimist@0.6.1, uglify-js@2.4.24)
├── moment@2.11.2
├── hexo-fs@0.1.5 (escape-string-regexp@1.0.5, graceful-fs@4.1.4, chokidar@1.5.1)
├── nunjucks@2.4.2 (asap@2.0.4, yargs@3.32.0, chokidar@1.5.1)
├── hexo-log@0.1.2 (bunyan@1.8.1)
├── hexo-util@0.5.3 (striptags@2.1.1, html-entities@1.2.0, camel-case@1.2.2, cross-spawn@2.2.3, h
ighlight.js@9.4.0)
├── cheerio@0.20.0 (entities@1.1.1, dom-serializer@0.1.0, css-select@1.2.0, htmlparser2@3.8.3, js
dom@7.2.2)
├── lodash@4.13.1
└── warehouse@2.2.0 (graceful-fs@4.1.4, is-plain-object@2.0.1, JSONStream@1.1.1, cuid@1.3.8)
INFO  Start blogging with Hexo!

C:\Users\Administrator\Desktop\blog>cd blog

C:\Users\Administrator\Desktop\blog\blog>npm install

C:\Users\Administrator\Desktop\blog\blog>hexo serve
INFO  Start processing
INFO  Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
```

现在打开浏览器访问http://localhost:4000/就可以看到首页了

![hexo_default_index_page](/images/hexo_default_index_page.png)

![hexo_default_index_page1](/images/hexo_default_index_page1.png)


**更新列表：**

* 2016-5-31
* Read more长度的控制：hexo 的readmore 是由自己在写文章的时候设定的，在文章正文里面部分的合适位置加上<!-- more --> 首页的预览就会到标识的位置



**参考文章：**

* [xxx][1]


[1]: http://xxx
