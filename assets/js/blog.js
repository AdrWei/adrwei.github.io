document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const postItems = document.querySelectorAll('.blog-content .card');
  const categorySelect = document.getElementById('category-select');
  const tagSelect = document.getElementById('tag-select');
  const categorySections = document.querySelectorAll('.one-line, .post-list');

  // 填充下拉菜单选项
  function populateSelectOptions() {
    const categories = new Set();
    const tags = new Set();

    postItems.forEach(item => {
      item.dataset.category.split(',').forEach(cat => categories.add(cat));
      item.dataset.tag.split(',').forEach(tag => tags.add(tag));
    });

    categories.forEach(cat => {
      categorySelect.add(new Option(cat, cat));
    });

    tags.forEach(tag => {
      tagSelect.add(new Option(tag, tag));
    });
  }

  // 更新筛选函数
  function updateFilters() {
    const selectedCategory = categorySelect.value;
    const selectedTag = tagSelect.value;

    // 隐藏或显示帖子
    postItems.forEach(item => {
      const itemCategories = item.dataset.category.split(',');
      const itemTags = item.dataset.tag.split(',');

      const showCategory = !selectedCategory || itemCategories.includes(selectedCategory);
      const showTag = !selectedTag || itemTags.includes(selectedTag);

      item.style.display = (showCategory && showTag) ? 'flex' : 'none';
    });

    // 隐藏或显示类别栏目
    categorySections.forEach(section => {
      const categoryTitle = section.previousElementSibling?.querySelector('h2')?.textContent;
      if (categoryTitle) {
        let hasVisiblePosts = false;
        const currentCategoryPosts = Array.from(postItems).filter(item => {
          const itemCategories = item.dataset.category.split(',');
          return itemCategories.includes(categoryTitle);
        });

        currentCategoryPosts.forEach(post => {
          if (post.style.display === 'flex') {
            hasVisiblePosts = true;
          }
        });

        if (selectedCategory && categoryTitle !== selectedCategory) {
          section.style.display = 'none';
          section.nextElementSibling.style.display = 'none';
        } else if (selectedTag && !hasVisiblePosts) {
          section.style.display = 'none';
          section.nextElementSibling.style.display = 'none';
        } else {
          section.style.display = 'block';
          section.nextElementSibling.style.display = 'block';
        }
      }
    });
  }

  // 绑定事件
  categorySelect.addEventListener('change', updateFilters);
  tagSelect.addEventListener('change', updateFilters);

  // 初始筛选和填充下拉菜单
  populateSelectOptions();
  updateFilters();

  // 点击卡片拖动
  const containers = document.querySelectorAll('.post-list');

  containers.forEach(container => {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.classList.add('dragging');
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
  });
});
