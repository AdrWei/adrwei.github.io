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
        date: doc.querySelector('meta[name="date"]')?.content || '未知日期',
        author: doc.querySelector('meta[name="author"]')?.content || '佚名',
        authorAvatar: doc.querySelector('meta[name="author-avatar"]')?.content || '/media/default-avatar.jpg',
        excerpt: doc.querySelector('meta[name="description"]')?.content ||
                 doc.querySelector('article p')?.textContent?.slice(0, 100) + '...',
        categories: doc.querySelector('meta[name="categories"]')?.content || '未分类',
        tags: doc.querySelector('meta[name="tags"]')?.content || '无标签'
    };
}

// 4. 格式化日期
function formatDate(dateString) {
    if (dateString === '未知日期') return dateString;
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toISOString().slice(0, 10);
}

// 获取选中的类别和标签
function getSelectedFilters() {
    const selectedCategories = Array.from(document.querySelectorAll('input[data-category]:checked'))
        .map(checkbox => checkbox.dataset.category);
    const selectedTags = Array.from(document.querySelectorAll('input[data-tag]:checked'))
        .map(checkbox => checkbox.dataset.tag);
    return { selectedCategories, selectedTags };
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
                const response = await fetch(`${postsPath}/${file}`);
                if (!response.ok) return null;
                const html = await response.text();
                return {
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

        // 根据选中的类别和标签筛选文章
        const { selectedCategories, selectedTags } = getSelectedFilters();
        let filteredPosts = validPosts;

        if (selectedCategories.length > 0) {
            filteredPosts = filteredPosts.filter(post => selectedCategories.includes(post.categories));
        }

        if (selectedTags.length > 0) {
            filteredPosts = filteredPosts.filter(post => selectedTags.some(tag => post.tags.includes(tag)));
        }

        postList.innerHTML = filteredPosts.map(post => `
            <div class="card">
                <article class="post-item">
                    <h2><a href="${post.url}">${post.title}</a></h2>
                    <div class="post-meta">
                        <img src="${post.authorAvatar}" alt="${post.author}头像" class="author-avatar">
                        <span>作者：${post.author}</span>
                        ${post.date !== '未知日期' ? `<time datetime="${post.date}">${formatDate(post.date)}</time>` : ''}
                    </div>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-meta">
                        <div class="tag-box">类型：${post.categories}</div>
                        <div class="tag-box">标签：${post.tags}</div>
                    </div>
                </article>
            </div>
        `).join('');

    } catch (error) {
        console.error('渲染文章列表失败:', error);
        postList.innerHTML = '<p class="error">加载文章失败，请刷新重试或检查控制台</p>';
    }
}

// 添加复选框的 change 事件监听器
document.addEventListener('DOMContentLoaded', function() {
    const filterCheckboxes = document.querySelectorAll('input[data-category], input[data-tag]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', renderPostList);
    });
    renderPostList();

  // 手机端filter功能  
    const filterButton = document.querySelector('.filter-button');
    const filterDrawer = document.querySelector('.filter-drawer');
    
    filterButton.addEventListener('click', () => {
    filterDrawer.classList.toggle('active');
});
});
