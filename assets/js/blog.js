document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const postItems = document.querySelectorAll('.blog-content .card, .category-posts .card, .category-content .card'); // 修改选择器
  const categorySelect = document.getElementById('category-select');
  const tagSelect = document.getElementById('tag-select');

  // 填充下拉菜单选项
  function populateSelectOptions() {
    const categories = new Set();
    const tags = new Set();

    postItems.forEach(item => {
      if (item.dataset.category) {
        item.dataset.category.split(',').forEach(cat => categories.add(cat.trim()));
      }
      if (item.dataset.tag) {
        item.dataset.tag.split(',').forEach(tag => tags.add(tag.trim()));
      }
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

    postItems.forEach(item => {
      const itemCategories = item.dataset.category ? item.dataset.category.split(',').map(cat => cat.trim()) : [];
      const itemTags = item.dataset.tag ? item.dataset.tag.split(',').map(tag => tag.trim()) : [];

      const showCategory = !selectedCategory || itemCategories.includes(selectedCategory);
      const showTag = !selectedTag || itemTags.includes(selectedTag);

      item.style.display = (showCategory && showTag) ? 'flex' : 'none';
    });
  }

  // 绑定事件
  categorySelect.addEventListener('change', updateFilters);
  tagSelect.addEventListener('change', updateFilters);

  // 初始筛选和填充下拉菜单
  populateSelectOptions();
  updateFilters();

  // 点击卡片拖动
  const containers = document.querySelectorAll('.post-list'); // 修改选择器

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
