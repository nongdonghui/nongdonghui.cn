---
layout: page
title: Archive
---

{% for category in site.categories %}

<div id="{{ category | first }}"> <h3> {{ category | first | capitalize }} </h3> </div>

{% for posts in category %}

{% for post in posts %}

{% if post.url %}

* <span style="color:#9a9a9a">{{ post.date | date_to_string }}</span> &raquo; [ {{ post.title }} ]({{ post.url }})

{% endif %}

{% endfor %}

{% endfor %}
  
{% endfor %}
