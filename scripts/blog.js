// blog.js
async function fetchPosts() {
    try {
        const filenames = ['/articles/testArticle.md']; // 修改路径

        for (const filename of filenames) {
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(`无法读取文件: ${filename}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown); // 使用 marked.js 转换 Markdown

            const titleMatch = html.match(/<h1>(.*?)<\/h1>/); // 提取标题
            const title = titleMatch ? titleMatch[1] : '无标题';

            const article = document.createElement('article');
            article.innerHTML = `<h2>${title}</h2>`;

            document.getElementById('post-list').appendChild(article);
        }
    } catch (error) {
        console.error('错误:', error);
        document.getElementById('post-list').textContent = '无法加载文章。';
    }
}

fetchPosts();
