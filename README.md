# 基于 Jekyll 的 GitHub Pages 网站

该网站以 Github Page 为基础，使用 jekyll 模板进行制作。

**文件存放位置**

* 主页面：index.html 在根目录下，其他页面统一保存在 _pages 文件夹里；
* 博客页面：博客主页面保存在 _pages 文件夹，分类页面保存在 _blogs 文件夹，贴文保存在 _posts 文件夹；
* css, js, 以及各类图片均保留在 assets 文件夹中；
* header.html，footer.html 文件保存在 _includes 文件夹中；
* 各类模板均保存在 _layout 文件夹里，其中 default.html 文件夹为基础，其他模板均套用此模板，用于整体布局；blog.html 模板仅用于 blog 主页面以及分类页，posts.html 模板用于 _posts 文件；
* _data 文件夹目前保存有作者名称与对应的 avatar 头像，另外，博客主页面的类目排序也保存在 category_order.yml 文件里；
* _config 文件用于添加插件与将 .md 文件转化为 html 文件；

**关于一些设计**

* **一些 css 方面的说明：**
    * category 相关的格式均保存在 _assets/css/blogs.css 文件中，由于运用较小不考虑另起 css 文件；
    * breadcrume 相关词条在 blogs.css 与 posts.css 中均有写，注意避免复用冲突；
    * 除主页面用 banner 外，其他页面用 content-banner 与对应的 containers，以展示文字为主；

* **目前 js 主要分几个板块：**
    * 主文件 main.js 主要作为导航栏的显示/隐藏，以及手机端导航栏的适应作用；
    * blog.js 文件主要作为 _pages/blogs.md 页面的类目与博文筛选用；
    * 主文件 main.js 主要作为导航栏的显示/隐藏，以及手机端导航栏的适应作用

* **关于 _blogs 与 _post 内部分类与文章：**
    * Front matter要求: 文章 _layout 用 category 和 blog, 文章 title, 作者名, 文章 excerpt，类型和标签（可填写多种）
    * 文件格式为 .md，写好贴文会自动生成对应的网页文件

* **关于 _config 文件：**
    * Collections 项目用于生成 _pages 与 _blogs 文件夹内 .md 文件的对应板块，并可设置具体 url premalink;
    * 单独的 premalink 项目对应 _posts 文件夹；该类目无需放在 collections 版块里，由 jekyll 自行处理；
