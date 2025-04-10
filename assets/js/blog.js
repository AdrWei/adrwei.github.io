document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const postItems = document.querySelectorAll('.blog-content .card');
  const categorySelect = document.getElementById('category-select');
  const tagSelect = document.getElementById('tag-select');

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

    postItems.forEach(item => {
      const itemCategories = item.dataset.category.split(',');
      const itemTags = item.dataset.tag.split(',');

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
});
