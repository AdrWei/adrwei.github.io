---
layout: default
title: 外贸工具
excerpt: 第三方外贸工具列表
meta:
  - name: description
    content: 定制全球品牌营销，0-1内容体系深耕建设
extra_css:
  - /assets/css/blog.css
extra_js:
  - /assets/js/blog.js
---

<div class="content-banner">
  <div class="content-banner-text">
    <h1>{{ page.title }}</h1>
    <p>{{ page.excerpt }}</p>
  </div>
  <img src="{{ '/assets/images/social-media.jpg' | relative_url }}" alt="PC Banner" class="pc-banner">
</div>

<main class="blog-content">
  <div class="filter-container">
    <div class="breadcrumb">
      <a href="/">首页</a> /
      {{ page.title }}
    </div>
  </div>

  {% for project in site.data.tools %}
    <li>
      <img src="{{ project[1].avatar }}" alt="{{ project[1].display_name }}" width="50" height="50">
      {{ project[1].display_name }}
    </li>
  {% endfor %}
  
  <div id="pagination"></div>
</main>
