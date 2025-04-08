function renderPost(postData) {
    const container = document.getElementById('post-container');
    if (!container) {
        console.error('post-container element not found.');
        return;
    }

    // HTML 转义函数 (简单示例)
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    const postTemplate = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="icon" type="image/x-icon" href="/media/logo-pure-blue.gif">
            <title>${escapeHtml(postData.title)}</title> 
            <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
            <div id="header"></div>
            <div class="blog-container">
                <article class="post">
                    <h1>${escapeHtml(postData.title)}</h1>
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

    container.innerHTML = postTemplate;
}
