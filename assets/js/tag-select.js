document.addEventListener('DOMContentLoaded', function() {
  // DOM 元素
  const postItems = document.querySelectorAll('.blog-content .card');
  const tagSelect = document.getElementById('tag-select');

  // 填充标签下拉菜单选项
  function populateTagOptions() {
    const tags = new Set();

    postItems.forEach(item => {
      if (item.dataset.tag) {
        item.dataset.tag.split(',').forEach(tag => tags.add(tag.trim()));
      }
    });

    tags.forEach(tag => {
      tagSelect.add(new Option(tag, tag));
    });
  }

  // 更新标签筛选函数
  function updateTagFilters() {
    const selectedTag = tagSelect.value;

    postItems.forEach(item => {
      const itemTags = item.dataset.tag ? item.dataset.tag.split(',').map(tag => tag.trim()) : [];

      const showTag = !selectedTag || itemTags.includes(selectedTag);

      item.style.display = showTag ? 'flex' : 'none';
    });
  }

  // 绑定标签选择事件
  tagSelect.addEventListener('change', updateTagFilters);

  // 初始填充标签下拉菜单和筛选
  populateTagOptions();
  updateTagFilters();
});
