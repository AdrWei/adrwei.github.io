const postsPath = '/posts';

async function getPostFiles() {
    try {
        // 方法1：获取预生成的 index.json
        const response = await fetch(`${postsPath}/index.json`);
        if (!response.ok) throw new Error('目录索引不存在');
        return await response.json();

        /* 方法2：如果服务器支持目录列表
        const html = await fetch(postsPath).then(r => r.text());
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return Array.from(doc.querySelectorAll('a[href$=".html"]'))
            .map(a => a.getAttribute('href')); */
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

// 修改后的 renderPostList 函数
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
            try {
                // 修正1：使用 fetch 替代未定义的 fetchPostData
                const response = await fetch(`${postsPath}/${file}`);
                if (!response.ok) return null;
                const html = await response.text();
                
                return {
                    // 修正2：使用正确的相对路径
                    url: `${postsPath}/${file}`,
                    filename: file,
                    ...await extractPostMetadata(html)
                };
            } catch (error) {
                console.error(`加载文章 ${file} 失败:`, error);
                return null;
            }
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
