// blog.js
const owner = 'AdrWei'; // 替换为你的 GitHub 用户名
const repo = 'adrwei.github.io'; // 替换为你的 GitHub 仓库名
const postsPath = '/posts/'; // 替换为你的文章路径

const postsPerPage = 10; // 每页显示的文章数量
let currentPage = 1;
let allPosts = []; // 保存所有文章数据

async function getPostsFromGitHub(owner, repo, path) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data
            .filter(item => item.type === 'file' && item.name.endsWith('.md'))
            .map(item => item.name);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

async function fetchPosts() {
    try {
        const postFiles = await getPostsFromGitHub(owner, repo, postsPath);

        allPosts = await Promise.all(
            postFiles.map(async filename => {
                const postResponse = await fetch(`/posts/${filename}`);
                const markdown = await postResponse.text();
                const html = marked.parse(markdown);
                return { filename, html };
            })
        );

        renderPosts();
        renderPagination();
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function renderPosts() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = allPosts.slice(startIndex, endIndex);

    currentPosts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post');
        article.innerHTML = `<h2>${post.filename}</h2>${post.html}`; // 使用文件名作为标题
        postList.appendChild(article);
    });
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const totalPages = Math.ceil(allPosts.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            renderPosts();
        });
        pagination.appendChild(button);
    }
}

fetchPosts();
