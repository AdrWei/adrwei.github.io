const owner = 'AdrWei';
const repo = 'adrwei.github.io';
const postsPath = 'posts';
const baseUrl = 'https://adrwei.github.io';

async function fetchPostData(filename) {
    const postUrl = `${baseUrl}/${postsPath}/${filename.replace(`${postsPath}/`, '')}`;
    console.log(`Fetching: ${postUrl}`);
    
    try {
        const response = await fetch(postUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.text();
    } catch (error) {
        console.error(`Failed to fetch ${postUrl}:`, error);
        return null;
    }
}

async function getPostFiles() {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${postsPath}?ref=main`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data
            .filter(file => file.type === 'file' && file.name.endsWith('.html'))
            .map(file => file.name);
    } catch (error) {
        console.error('API请求失败:', error);
        return [];
    }
}

// 使用示例
getPostFiles().then(files => {
    files.forEach(file => {
        fetchPostData(file).then(html => {
            if (html) {
                console.log(`成功加载: ${file}`);
                // 处理HTML内容...
            }
        });
    });
});
