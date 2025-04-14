---
layout: default
title: 图片展示
extra_css:
  - /assets/css/gallery.css
extra_js:
  - /assets/js/gallery.js
---
<div class="folder-tabs">
  <button class="folder-tab" data-folder="">所有文件夹</button>
</div>

<div class="gallery">
  {% assign image_files = site.static_files | where_exp: 'file', 'file.path contains "/assets/images/"' %}
  {% assign sorted_images = image_files | sort: 'modified_time' | reverse %}

  {% for image in sorted_images %}
    {% assign parts = image.path | split: '/' %}
    {% assign foldername = parts[-2] %}
    {% assign filename = parts[-1] %}
    <div class="gallery-item" data-folder="{{ foldername }}">
      <img
        src="{{ image.path | relative_url }}"
        alt="{{ filename }}"
        loading="lazy"
        data-src="{{ image.path | relative_url }}"
      >
      <div class="filepath">{{ filename }}</div>
    </div>
  {% endfor %}
</div>

<div class="overlay"></div>
