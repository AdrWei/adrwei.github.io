---
layout: default
title: 博客
excerpt: 知识就是力量
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
    <select id="category-select">
      <option value="">类别</option>
    </select>
    <select id="tag-select">
      <option value="">标签</option>
    </select>
  </div>

  {% assign ordered_categories = site.data.category_order.ordered_categories %}

  {% for category in ordered_categories %}
    {% assign category_posts = site.posts | where: "categories", category %}

    <div class="category-section" data-category="{{ category }}">
      {% if category_posts.size > 0 %}
        <span class="one-line">
          <h2>{{ category }}</h2>
          <a href="/blog/{{ category | slugify }}">▶ 查看全部</a>
        </span>

        {% assign category_file = site.blogs | where: "title", category | first %}
        {% if category_file %}
          <p class="section-subheader">{{ category_file.subtitle }}</p>
        {% endif %}

        <div class="post-list">
          {% assign category_posts = site.posts | where: "categories", category | sort: "date" | reverse | limit: 6 %}
          {% for post in category_posts %}
            <div class="card" data-category="{{ post.categories | join: ',' }}" data-tag="{{ post.tags | join: ',' }}">
              <article class="post-item">
                <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
                <p class="post-excerpt">{{ post.excerpt }}</p>
              </article>
              <div class="tag-meta">
                <div class="tag-box">{{ post.categories | join: ', ' }}</div>
                <div class="tag-box">{{ post.tags | join: ', ' }}</div>
              </div>
              <div class="post-meta">
                <img src="{{ site.data.authors[post.author].avatar }}" alt="{{ site.data.authors[post.author].display_name }} 的头像" class="author-avatar">
                <span>{{ site.data.authors[post.author].display_name }}</span>
                {% if post.date %}
                  <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%Y-%m-%d' }}</time>
                {% endif %}
              </div>
            </div>
          {% endfor %}
        </div>
      {% endif %}
    </div>
  {% endfor %}

  <div id="pagination"></div>
</main>
