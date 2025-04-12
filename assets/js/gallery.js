  document.addEventListener('DOMContentLoaded', function() {
    // DOM 元素
    const galleryItems = document.querySelectorAll('.gallery .gallery-item');
    const folderTabs = document.querySelector('.folder-tabs');

    // 填充文件夹标签（tab）
    function populateFolderTabs() {
      const folders = new Set();

      galleryItems.forEach(item => {
        folders.add(item.dataset.folder);
      });

      folders.forEach(folder => {
        const tab = document.createElement('button');
        tab.classList.add('folder-tab');
        tab.dataset.folder = folder;
        tab.textContent = folder;
        folderTabs.appendChild(tab);
      });
    }

    // 更新文件夹筛选函数
    function updateFolderFilters(selectedFolder) {
      galleryItems.forEach(item => {
        const itemFolder = item.dataset.folder;

        const showFolder = !selectedFolder || itemFolder === selectedFolder;

        item.style.display = showFolder ? 'block' : 'none';
      });
    }

    // 绑定文件夹标签（tab）点击事件
    folderTabs.addEventListener('click', function(event) {
      if (event.target.classList.contains('folder-tab')) {
        const selectedFolder = event.target.dataset.folder;

        // 移除所有标签（tab）的 active 类
        folderTabs.querySelectorAll('.folder-tab').forEach(tab => {
          tab.classList.remove('active');
        });

        // 为当前点击的标签（tab）添加 active 类
        event.target.classList.add('active');

        // 更新文件夹筛选
        updateFolderFilters(selectedFolder);
      }
    });

    // 初始填充文件夹标签（tab）和筛选
    populateFolderTabs();
    updateFolderFilters(''); // 默认显示所有文件夹

    // 添加图片放大功能
    const overlay = document.querySelector('.overlay');
    const galleryImages = document.querySelectorAll('.gallery .gallery-item img');

    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        const enlargedImg = document.createElement('img');
        enlargedImg.src = img.dataset.src;
        overlay.innerHTML = '';
        overlay.appendChild(enlargedImg);
        overlay.style.display = 'flex';
      });
    });

    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
  });
