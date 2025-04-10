document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const postItems = document.querySelectorAll('.blog-content .card, .category-content .card'); // 修改选择器
  const tagSelect = document.getElementById('tag-select');

  // 填充下拉菜单选项
  function populateSelectOptions() {
    const tags = new Set();

    postItems.forEach(item => {
      item.dataset.tag.split(',').forEach(tag => tags.add(tag));
    });

    tags.forEach(tag => {
      tagSelect.add(new Option(tag, tag));
    });
  }

  // 更新筛选函数
  function updateFilters() {
    const selectedTag = tagSelect.value;

    postItems.forEach(item => {
      const itemTags = item.dataset.tag.split(',');

      const showTag = !selectedTag || itemTags.includes(selectedTag);

      item.style.display = showTag ? 'flex' : 'none';
    });
  }

  // 绑定事件
  tagSelect.addEventListener('change', updateFilters);

  // 初始筛选和填充下拉菜单
  populateSelectOptions();
  updateFilters();
});
