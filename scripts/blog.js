async function displayPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = ''; // 清空内容

    try {
        const filenames = ['posts/test1.md', 'posts/test2.md']; // 文章文件名

        for (const filename of filenames) {
            const response = await fetch(filename);
            if (!response.ok) {
                throw new Error(`无法读取文件: ${filename}`);
            }
            const markdown = await response.text();
            const html = marked.parse(markdown);

            // 提取标题
            const titleMatch = html.match(/<h1>(.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1] : '无标题';

            // 创建文章标题元素
            const article = document.createElement('article');
            article.innerHTML = `<h2>${title}</h2>`;

            postList.appendChild(article);
        }
    } catch (error) {
        console.error('错误:', error);
        postList.textContent = '无法加载文章。';
    }
}

displayPosts();
