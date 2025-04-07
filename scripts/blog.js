// blog.js

const owner = 'AdrWei';
const repo = 'adrwei.github.io';
const postsPath = 'posts';

async function fetchPostData(filename) {
    try {
        const response = await fetch(`${postsPath}/${filename}`);
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

async function getPostFiles() {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${postsPath}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data
            .filter(item => item.type === 'file' && item.name.endsWith('.html'))
            .map(item => item.name);
    } catch (error) {
        console.error('Error fetching post files:', error);
        return [];
    }
}

async function displayPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    try {
        const postFiles = await getPostFiles();
        const postData = await Promise.all(postFiles.map(fetchPostData));

        postData.forEach(post => {
            if (post) {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2><a href="${postsPath}/${post.filename}">${post.title}</a></h2>
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
