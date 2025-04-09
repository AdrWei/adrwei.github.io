---
layout: default
permalink: /category/
---

{% assign category_name = page.url | split: "/" | last %}

{% for category in site.categories %}
  {% if category[0] == category_name %}
    <h1>分类：{{ category_name }}</h1>
    <ul>
      {% for post in category[1] %}
        <li>
          <a href="{{ post.url }}">{{ post.title }}</a>
          <small>{{ post.date | date: "%Y-%m-%d" }}</small>
        </li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
