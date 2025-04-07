// blog.js

async function fetchPostData(filename) {
    try {
        const response = await fetch(`posts/${filename}`);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const title = doc.querySelector('title').textContent;
        const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '暂无描述';

        return { filename, title, description };
    } catch (error) {
        console.error(`Error fetching post data for ${filename}:`, error);
        return null;
    }
}

async function displayPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = ''; // 清空内容

    try {
        // 获取 posts 目录下所有 HTML 文件名
        const response = await fetch('posts/');
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a');

        const postFiles = Array.from(links)
            .map(link => link.href)
            .filter(href => href.endsWith('.html'))
            .map(href => href.split('/').pop());

        const postData = await Promise.all(postFiles.map(fetchPostData));

        postData.forEach(post => {
            if (post) {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2><a href="posts/${post.filename}">${post.title}</a></h2>
                    <p>${post.description}</p>
                `;
                postList.appendChild(article);
            }
        });
    } catch (error) {
        console.error('Error displaying posts:', error);
        postList.textContent = '无法加载文章列表。';
    }
}

displayPosts();
