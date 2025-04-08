function renderPost(postData) {
    const postTemplate = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${postData.title}</title> 
            <link rel="stylesheet" href="/css/styles.css">
            <link rel="stylesheet" href="/css/blog.css">
        </head>
        <body>
            <div id="header"></div>
            <div class="blog-container">
                <article class="post">
                    <h1>${postData.title}</h1>
                    <div class="content">
                        ${postData.content}
                    </div>
                </article>
            </div>
            <div id="footer"></div>
            <script src="/scripts/main.js"></script>
        </body>
        </html>
    `;

    document.getElementById('post-container').innerHTML = postTemplate;
}
