const owner = 'adrwei'; // 替换为你的 GitHub 用户名
const repo = 'adrwei.github.io'; // 替换为你的 GitHub 仓库名
const path = '/media/vectors/'; // 替换为你的图片路径
const perPage = 50; // 每页显示的图片数量

let currentPage = 1;
let imageUrls = [];

const imageContainer = document.getElementById('image-container');
const pageNumberDisplay = document.getElementById('page-number');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

async function getImagesFromGitHub(owner, repo, path) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.filter(item => item.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(item.name))
            .map(item => item.download_url);
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
}

function displayImages(page) {
    imageContainer.innerHTML = ''; // 清空容器
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const pageImages = imageUrls.slice(startIndex, endIndex);

    pageImages.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        imageContainer.appendChild(img);
    });

    pageNumberDisplay.textContent = page;
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = endIndex >= imageUrls.length;
}

async function init() {
    imageUrls = await getImagesFromGitHub(owner, repo, path);
    displayImages(currentPage);
}

init();

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayImages(currentPage);
    }
});

nextPageButton.addEventListener('click', () => {
    if (currentPage * perPage < imageUrls.length) {
        currentPage++;
        displayImages(currentPage);
    }
});
