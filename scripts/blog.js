// blog.js
const postsPerPage = 10; // 每页显示的文章数量
let currentPage = 1;
let allPosts = []; // 保存所有文章数据

// 获取文章列表
async function fetchPosts() {
    try {
        // 1. 读取 posts.json 文件
        const response = await fetch('/posts.json');
        const postFiles = await response.json();

        // 2. 读取每篇文章的内容
        allPosts = await Promise.all(
            postFiles.map(async filename => {
                // 3. 使用正确的文章路径 /posts/${filename}
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

// 渲染文章列表
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

// 渲染分页按钮
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
