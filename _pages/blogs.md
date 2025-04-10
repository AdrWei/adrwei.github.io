---
layout: default
title: 橡树工作室 - 助力品牌出海
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
    <h1>博文板块</h1>
    <p>这里你能获得新的知识与力量</p>
  </div>
  <img src="{{ '/assets/images/social-media.jpg' | relative_url }}" alt="PC Banner" class="pc-banner">
</div>


<main class="blog-content">
  <div class="filter-container">
    <h4>文章列表</h4>
    <select id="category-select">
      <option value="">类别</option>
    </select>
    <select id="tag-select">
      <option value="">标签</option>
    </select>
  </div>
  
  {% assign ordered_categories = site.data.category_order.ordered_categories %}

  {% for category in ordered_categories %}
    <h2>{{ category }}</h2>

    <div id="post-list">
      {% for post in site.posts %}
        {% if post.categories contains category %}
          <div class="card" data-category="{{ post.categories | join: ',' }}" data-tag="{{ post.tags | join: ',' }}">
            <article class="post-item">
              <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="tag-meta">
              <div class="tag-box">{{ post.categories | join: ', ' }}</div>
              <div class="tag-box">{{ post.tags | join: ', ' }}</div>
              <div class="post-meta">
              <img src="{{ site.data.authors[post.author].avatar }}" alt="{{ site.data.authors[post.author].display_name }} 的头像" class="author-avatar">
              <span>{{ site.data.authors[post.author].display_name }}</span>
              {% if post.date %}
                <time datetime="{{ post.date | date: '%Y-%m-%d' }}">{{ post.date | date: '%Y-%m-%d' }}</time>
              {% endif %}
            </article>
              </div>
              </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  {% endfor %}

  <div id="pagination"></div>
</main>
