该网站以Github Page为基础，使用jekyll模板进行制作。

**1.文件存放位置**  
a. 主页面：index.html在根目录下，其他页面统一保存在_pages文件夹里；
b. 博客页面：博客主页面保存在_pages文件夹，分类页面保存在_blogs文件夹，贴文保存在_posts文件夹；
c. css, js, 以及各类图片均保留在assets文件夹中；
d. header.html，footer.html文件保存在_includes文件夹中；
e. 各类模板均保存在_layout文件夹里，其中default.html文件夹为基础，其他模板均套用此模板，用于整体布局；blog.html模板仅用于blog主页面以及分类页，posts.html模板用于_posts文件；
f. _data文件夹目前保存有作者名称与对应的avatar头像，另外，博客主页面的类目排序也保存在category_order.yml文件里；
g. _config文件用于添加插件与将.md文件转化为html文件；

**2. 关于一些设计**  
a. 一些css方面的说明：
  (1) category相关的格式均保存在_assets/css/blogs.css文件中，由于运用较小不考虑另起css文件；
  (2) breadcrume相关词条在blogs.css与posts.css中均有写，注意避免复用冲突；
  (3) 除主页面用banner外，其他页面用content-banner与对应的containers，以展示文字为主；
  
b. 目前js主要分几个板块:
  (1) 主文件main.js主要作为导航栏的显示/隐藏,以及手机端导航栏的适应作用;
  (2) blog.js文件主要作为_pages/blogs.md页面的类目与博文筛选用；
  (3) 主文件main.js主要作为导航栏的显示/隐藏,以及手机端导航栏的适应作用
  
c. 关于_blogs与_post内部分类与文章：
  (1) front matter: 要求文章_layout用category和blog, 文章title, 作者名, 文章excerpt，类型和标签（可填写多种）
  (2) 文件格式为.md，写好贴文会自动生成对应的网页文件
  
d. 关于_config文件
  (1) collections项目用于生成_pages与_blogs文件夹内.md文件的对应板块，并可设置具体url premalink;
  (2) 单独的premalink项目对应_posts文件夹；该类目无需放在collections版块里，由jekyll自行处理；
