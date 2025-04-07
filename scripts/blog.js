// 读取文章列表
fetch('/posts/')
  .then(response => response.text())
  .then(html => {
    // 解析 HTML 获取文章文件名
    // ...
    // 生成文章列表
    // ...
  });

// 读取文章内容
function loadPost(filename) {
  fetch('/_posts/' + filename)
    .then(response => response.text())
    .then(markdown => {
      // 将 Markdown 转换为 HTML
      const html = marked.parse(markdown);
      // 将 HTML 插入到页面
      document.getElementById('post-content').innerHTML = html;
    });
}
