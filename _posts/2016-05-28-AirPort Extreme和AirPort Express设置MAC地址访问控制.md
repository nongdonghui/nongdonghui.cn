---
layout: post
title: Win7下AirPort Extreme和AirPort Express设置MAC地址访问控制
categories: apple
lastUpdated: 5.29
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

**所需工具**：AirPortSetup.exe

**Airport Extreme**：50个客户端，支持同步双频，就是同时以两种频率连接不通的设备，高低速设备分开走。没有耳机插孔，有一个usb插孔，可以接移动硬盘或打印机，也可通过USB HUB同时接多个设备。有4个千兆RJ45插口，一个接宽带，三个接设备。

![AirPortExtreme](/images/AirPortExtreme.jpg)

**Airport Express**：10个客户端，支持2.4GHz和5GHz网络但不能同时实用，也就是说如果你有老设备要接入网络，就要走低标准，所有设备快不起来。基站上带有耳机插孔，可以接上音箱通过Airplay将音乐从计算机上以无线方式传到音箱，没有usb口。只有一个百兆RJ45插口用以连接宽带网线。 

![AirPortExpress](/images/AirPortExpress.jpg)

**设置MAC访问方法**

一般Airport Express是用来从Airport Extreme接收信号的，相当于子无线路由，信号与Airport Extreme同步

**首先**，点击选中Airport Express，记录它的AirPort ID(就是它的MAC地址)

接着我们选择Airport Extreme，点手动设置，输入密码，选择AirPort下的访问控制，默认是未启用的，我们选择定时访问

![AirPortSetting1](/images/AirPortSetting1.png)

**然后**，要为我们的一台设备添加MAC白名单，点击`+`按钮，输入要允许访问网络的MAC地址或者点本电脑

![AirPortSetting2](/images/AirPortSetting2.png)

**最后**，修改(默认)项的(不限制)，这一项必须要修改，不然就是全部允许访问了，把它修改为不访问

![AirPortSetting3](/images/AirPortSetting3.png)

**如果**，你想把Airport Express也设置进去，则再添加一个即可，这样就OK了，单击`更新`之后，等待自动重启后，只有上面设置了MAC白名单的设备能访问网络了。

**更新列表：**

*



**参考文章：**

* [苹果不会告诉你的事——关于Airport基站][1]


[1]: https://www.douban.com/group/topic/37410332/
