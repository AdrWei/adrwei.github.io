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

{% assign tools_data = site.data.tools %}

{% for category, tools in tools_data %}
  <span class="one-line">
    <h2>{{ category }}</h2>
    <a href="/tools/{{ category | slugify }}">▶ 查看全部</a>
  </span>

  <div class="post-list">
    {% for tool in tools %}
      <div class="card">
        <article class="post-item">
          <h3>{{ tool.name }}</h3>
          <img src="{{ tool.icon | relative_url }}" alt="{{ tool.name }} 图标">
          <p class="post-excerpt">{{ tool.description }}</p>
        </article>
        <div class="tag-meta">
          <div class="tag-box">{{ category }}</div>
        </div>
      </div>
    {% endfor %}
  </div>
{% endfor %}

  <div id="pagination"></div>
</main>
