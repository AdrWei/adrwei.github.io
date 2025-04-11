---
layout: default
title: 外贸工具
excerpt: 第三方外贸工具列表
meta:
  - name: description
    content: 定制全球品牌营销，0-1内容体系深耕建设
extra_css:
  - /assets/css/tools.css
---

<div class="content-banner">
  <div class="content-banner-text">
    <h1>{{ page.title }}</h1>
    <p>{{ page.excerpt }}</p>
  </div>
  <img src="{{ '/assets/images/social-media.jpg' | relative_url }}" alt="PC Banner" class="pc-banner">
</div>

<main class="tool-content">
  <div class="filter-container">
    <div class="breadcrumb">
      <a href="/">首页</a> /
      {{ page.title }}
    </div>
  </div>

{% assign categories = "" | split: "" %}

{% for project in site.data.tools %}
    {% assign category = project[1].category %}
    {% assign categories = categories | push: category %}
{% endfor %}

{% assign categories = categories | uniq %}

{% for category in categories %}
<div class="tool-container">
    <h2>&lt;{{ category }}&gt;</h2>
        {% for project in site.data.tools %}
            {% if project[1].category == category %}
                <div class="tool-card">
                    <img class="tool-icon" src="{{ project[1].icon }}" alt="{{ project[0] }} 图标" width="50" height="50">
                    <span class="tool-box">
                    <h3><a href="{{ project[1].url }}" target="_blank" rel="noopener">{{ project[0] }}</a></h3>
                    <p class="tool-info"> {{ project[1].description }} </p>
                    </span>
                </div>
            {% endif %}
        {% endfor %}
        </div>
{% endfor %}
  
  <div id="pagination"></div>
</main>
