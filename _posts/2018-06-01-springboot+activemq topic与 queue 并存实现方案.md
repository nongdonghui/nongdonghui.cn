---
layout: post
title: springboot+activemq topic与 queue 并存实现方案
categories: springboot
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>


```
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;

import javax.jms.ConnectionFactory;

/**
 * @author Yang
 * @create 2018-04-24 15:22
 * 描述：
 */
@Configuration
public class MyContainerFactory {

    /**
     * 主题模式
     * @param connectionFactory
     * @return
     */
    @Bean
    public JmsListenerContainerFactory<?> jmsListenerContainerTopic(ConnectionFactory connectionFactory) {
        DefaultJmsListenerContainerFactory bean = new DefaultJmsListenerContainerFactory();
        bean.setPubSubDomain(true);
        bean.setConnectionFactory(connectionFactory);
        return bean;
    }

    /**
     * 队列模式
     * @param connectionFactory
     * @return
     */

    @Bean
    public JmsListenerContainerFactory<?> jmsListenerContainerQueue(ConnectionFactory  connectionFactory) {
        DefaultJmsListenerContainerFactory bean = new DefaultJmsListenerContainerFactory();
        bean.setConnectionFactory(connectionFactory);
        return bean;
    }
}
```

```
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;

/**
 * @author Yang
 * @create 2018-04-23 16:54
 * 描述：
 */
@Component
public class Consumer {

    @JmsListener(destination = "queue",containerFactory ="jmsListenerContainerQueue")
    @SendTo("returnmsg")
    public String receiveQueue(String msg) {
        System.out.println("==============" + msg + "==================");
        return "老铁我收到了"+msg;
    }

    @JmsListener(destination = "queue",containerFactory ="jmsListenerContainerQueue")
    public void receiveQueue2(String msg) {
        System.out.println("======receiveQueue2========" + msg + "=========receiveQueue2=========");
    }


    @JmsListener(destination = "topic",containerFactory ="jmsListenerContainerTopic")
    @SendTo("returnmsg")
    public String receiveTopic(String msg){
        System.out.println("==topic=====" + msg + "=======topic====");
        return "topic"+msg;
    }

    @JmsListener(destination = "topic",containerFactory ="jmsListenerContainerTopic")
    public void receiveTopic2(String msg){
        System.out.println("==topic2=====" + msg + "=======topic2====");
    }
}

```

**更新列表：**

*



**参考文章：**

* [springboot+activemq topic与 queue 并存实现方案][1]


[1]: https://blog.csdn.net/Mr_yangzc/article/details/80065374







 








