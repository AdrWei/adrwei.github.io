document.addEventListener('DOMContentLoaded', function () {
  const postItems = document.querySelectorAll('.blog-content #post-list .card');
  const categoryCheckboxes = document.querySelectorAll('input[data-category]');
  const tagCheckboxes = document.querySelectorAll('input[data-tag]');
  const categorySelect = document.getElementById('category-select');
  const tagSelect = document.getElementById('tag-select');

  // 动态生成筛选选项 (手机端)
  function generateFilterOptions() {
    // 从侧边栏获取类别和标签
    const categoryLabels = document.querySelectorAll('.sidebar .categories label');
    const tagLabels = document.querySelectorAll('.sidebar .tags label');

    // 添加类别选项
    categoryLabels.forEach((label) => {
      const category = label.textContent.trim();
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    // 添加标签选项
    tagLabels.forEach((label) => {
      const tag = label.textContent.trim();
      const option = document.createElement('option');
      option.value = tag;
      option.textContent = tag;
      tagSelect.appendChild(option);
    });
  }

  // 筛选逻辑
  function updatePostVisibility(selectedCategories, selectedTags, isMobile) {
    postItems.forEach((item) => {
      const itemCategories = (item.dataset.category || '').split(',');
      const itemTags = (item.dataset.tag || '').split(',');

      let categoryMatch = false;
      let tagMatch = false;

      if (isMobile) {
        // 手机端
        categoryMatch = !selectedCategories || itemCategories.includes(selectedCategories);
        tagMatch = !selectedTags || itemTags.includes(selectedTags);
      } else {
        // PC 端
        categoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => itemCategories.includes(category));
        tagMatch = selectedTags.length === 0 || selectedTags.some(tag => itemTags.includes(tag));
      }

      item.style.display = categoryMatch && tagMatch ? 'block' : 'none';
    });
  }

  // 初始化
  function init() {
    const isMobile = window.innerWidth < 768; // 假设 768px 是手机端的阈值

    if (isMobile) {
      // 手机端
      generateFilterOptions();

      categorySelect.addEventListener('change', () => {
        updatePostVisibility(categorySelect.value, tagSelect.value, true);
      });

      tagSelect.addEventListener('change', () => {
        updatePostVisibility(categorySelect.value, tagSelect.value, true);
      });
    } else {
      // PC 端
      categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.category);
          const selectedTags = Array.from(tagCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.tag);
          updatePostVisibility(selectedCategories, selectedTags, false);
        });
      });

      tagCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.category);
          const selectedTags = Array.from(tagCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.tag);
          updatePostVisibility(selectedCategories, selectedTags, false);
        });
      });
    }
  }

  init();
});
