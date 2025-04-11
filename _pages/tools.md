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
>

<ul>
  {% for project_name, project_data in site.data.tools %}
    <li>
      <strong>项目名称：</strong> {{ project_name }}<br>
      <strong>类别：</strong> {{ project_data.category }}<br>
      <img src="{{ project_data.icon }}" alt="{{ project_data.category }} 图标" width="50" height="50"><br>
      <strong>描述：</strong> {{ project_data.description }}
    </li>
  {% endfor %}
</ul>
  
  <div id="pagination"></div>
</main>
