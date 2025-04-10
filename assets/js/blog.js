document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const postItems = document.querySelectorAll('.blog-content .card');
  const categoryFilters = document.querySelectorAll('.category-filter');
  const tagFilters = document.querySelectorAll('.tag-filter');

  // 更新筛选函数
  function updateFilters() {
    const selectedCategories = Array.from(categoryFilters)
      .filter(filter => filter.value !== 'all')
      .map(filter => filter.value);

    const selectedTags = Array.from(tagFilters)
      .filter(filter => filter.value !== 'all')
      .map(filter => filter.value);

    postItems.forEach(item => {
      const itemCategories = item.dataset.category.split(',');
      const itemTags = item.dataset.tag.split(',');

      const showCategory = selectedCategories.length === 0 ||
        selectedCategories.some(cat => itemCategories.includes(cat));
      const showTag = selectedTags.length === 0 ||
        selectedTags.some(tag => itemTags.includes(tag));

      item.style.display = (showCategory && showTag) ? 'block' : 'none';
    });
  }

  // 绑定事件
  categoryFilters.forEach(filter => filter.addEventListener('change', updateFilters));
  tagFilters.forEach(filter => filter.addEventListener('change', updateFilters));

  // 初始筛选
  updateFilters();
});
