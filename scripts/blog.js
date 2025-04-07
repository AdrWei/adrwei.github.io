const owner = 'AdrWei';
const repo = 'adrwei.github.io';
const postsPath = 'posts';
const baseUrl = 'https://adrwei.github.io';

// 1. 获取文章内容
async function fetchPostData(filename) {
    const postUrl = `${baseUrl}/${postsPath}/${filename}`;
    try {
        const response = await fetch(postUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.text();
    } catch (error) {
        console.error(`加载文章失败: ${filename}`, error);
        return null;
    }
}

// 2. 获取文章列表
async function getPostFiles() {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${postsPath}?ref=main`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data
            .filter(file => file.type === 'file' && file.name.endsWith('.html'))
            .map(file => file.name);
    } catch (error) {
        console.error('获取文章列表失败:', error);
        return [];
    }
}

// 3. 提取文章元数据
async function extractPostMetadata(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return {
        title: doc.querySelector('h1')?.textContent || 
               doc.title.replace('橡树工作室 - ', '') || 
               '未命名文章',
        date: doc.querySelector('time')?.datetime || '未知日期',
        excerpt: doc.querySelector('meta[name="description"]')?.content || 
                doc.querySelector('article p')?.textContent?.slice(0, 100) + '...'
    };
}

// 4. 格式化日期
function formatDate(dateString) {
    if (dateString === '未知日期') return dateString;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
}

// 5. 渲染文章列表
async function renderPostList() {
    const postList = document.getElementById('post-list');
    if (!postList) return;

    postList.innerHTML = '<p>加载文章中...</p>';

    try {
        const files = await getPostFiles();
        if (files.length === 0) {
            postList.innerHTML = '<p>暂无文章</p>';
            return;
        }

        const posts = await Promise.all(files.map(async file => {
            const html = await fetchPostData(file);
            if (!html) return null;
            return {
                url: `${baseUrl}/${postsPath}/${file}`,
                filename: file,
                ...await extractPostMetadata(html)
            };
        }));

        const validPosts = posts.filter(Boolean).sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        postList.innerHTML = validPosts.map(post => `
            <article class="post-item">
                <h2><a href="${post.url}">${post.title}</a></h2>
                <div class="post-meta">
                    ${post.date !== '未知日期' ? `<time datetime="${post.date}">${formatDate(post.date)}</time>` : ''}
                </div>
                <p class="post-excerpt">${post.excerpt}</p>
            </article>
        `).join('');

    } catch (error) {
        console.error('渲染文章列表失败:', error);
        postList.innerHTML = '<p class="error">加载文章失败，请刷新重试或检查控制台</p>';
    }
}

// 6. 页面加载后执行
document.addEventListener('DOMContentLoaded', renderPostList);
