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

  <div class="post-list">
    {% for tool_name, tool_data in site.data.tools %}
      <div class="card">
        <article class="post-item">
          <h3>{{ tool_name }}</h3>
          <img src="{{ tool_data.icon | relative_url }}" alt="{{ tool_name }} 图标">
          <p class="post-excerpt">{{ tool_data.description }}</p>
        </article>
        <div class="tag-meta">
          <div class="tag-box">{{ tool_data.category }}</div>
        </div>
      </div>
    {% endfor %}
  </div>

  <div id="pagination"></div>
</main>
