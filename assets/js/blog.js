document.addEventListener('DOMContentLoaded', function() {
  // 滚动按钮功能
  const scrollContainers = document.querySelectorAll('.scroll-container');

  scrollContainers.forEach(container => {
    const scrollContent = container.querySelector('.scroll-content');
    const scrollLeftButton = container.querySelector('.scroll-left');
    const scrollRightButton = container.querySelector('.scroll-right');

    scrollLeftButton.addEventListener('click', () => {
      scrollContent.scrollBy({
        left: -310, // 卡片宽度 + 间距
        behavior: 'smooth',
      });
    });

    scrollRightButton.addEventListener('click', () => {
      scrollContent.scrollBy({
        left: 310, // 卡片宽度 + 间距
        behavior: 'smooth',
      });
    });
  });

  // 筛选功能
  const postItems = document.querySelectorAll('.card'); // 修改选择器
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

      item.style.display = (showCategory && showTag) ? 'flex' : 'none'; // 修改显示方式
    });
  }

  // 绑定事件
  categorySelect.addEventListener('change', updateFilters);
  tagSelect.addEventListener('change', updateFilters);

  // 初始筛选和填充下拉菜单
  populateSelectOptions();
  updateFilters();
});
