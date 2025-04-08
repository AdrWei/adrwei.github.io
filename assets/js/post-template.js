function renderPost(content) {
    const postTemplate = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>文章标题</title> 
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <div id="header"></div>
            <div class="blog-container">
                <article class="post">
                    <div class="content">
                        ${content}
                    </div>
                </article>
            </div>
            <div id="footer"></div>
        </body>
        </html>
    `;

    document.getElementById('post-container').innerHTML = postTemplate;
}

// 加载和解析 Markdown 文件
fetch('fetch('https://raw.githubusercontent.com/AdrWei/adrwei.github.io/main/articles/testArticle.md')')
    .then(response => response.text())
    .then(markdown => {
        const html = marked(markdown);
        renderPost(html);
    });
