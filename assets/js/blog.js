document.addEventListener('DOMContentLoaded', function() {
  const filterDropdown = document.querySelector('.filter-dropdown-content');
  const filterButtons = filterDropdown.querySelectorAll('li');
  const postItems = document.querySelectorAll('.post-item');
  const categoryCheckboxes = document.querySelectorAll('input[data-category]');
  const tagCheckboxes = document.querySelectorAll('input[data-tag]');

  // 筛选下拉菜单
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.category;
      const tag = this.dataset.tag;

      postItems.forEach(item => {
        const itemCategory = item.dataset.category;
        const itemTags = item.dataset.tag.split(',');

        if (category && itemCategory !== category) {
          item.style.display = 'none';
        } else if (tag && !itemTags.includes(tag)) {
          item.style.display = 'none';
        } else {
          item.style.display = 'block';
        }
      });
    });
  });

  // 侧边栏复选框筛选
  function updatePostVisibility() {
    let selectedCategories = Array.from(categoryCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.dataset.category);

    let selectedTags = Array.from(tagCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.dataset.tag);

    postItems.forEach(item => {
      const itemCategory = item.dataset.category;
      const itemTags = item.dataset.tag.split(',');

      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(itemCategory);
      const tagMatch = selectedTags.length === 0 || selectedTags.some(tag => itemTags.includes(tag));

      item.style.display = categoryMatch && tagMatch ? 'block' : 'none';
    });
  }

  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePostVisibility);
  });

  tagCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePostVisibility);
  });
});
