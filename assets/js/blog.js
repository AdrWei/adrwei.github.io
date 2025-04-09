document.addEventListener('DOMContentLoaded', function () {
  const postItems = document.querySelectorAll('.blog-content #post-list .card');
  const categoryCheckboxes = document.querySelectorAll('input[data-category]');
  const tagCheckboxes = document.querySelectorAll('input[data-tag]');
  const filterDropdownButton = document.querySelector('.filter-dropdown-button');
  const filterDropdownContent = document.querySelector('.filter-dropdown-content');

  // 动态生成筛选选项 (手机端)
  function generateFilterOptions() {
    const categories = [...new Set(Array.from(postItems).map((item) => item.dataset.category.split(',')).flat())];
    const tags = [...new Set(Array.from(postItems).map((item) => item.dataset.tag.split(',')).flat())];

    categories.forEach((category) => {
      const option = document.createElement('li');
      option.textContent = category;
      option.dataset.category = category;
      filterDropdownContent.appendChild(option);
    });

    tags.forEach((tag) => {
      const option = document.createElement('li');
      option.textContent = tag;
      option.dataset.tag = tag;
      filterDropdownContent.appendChild(option);
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

      filterDropdownContent.addEventListener('click', (event) => {
        const selectedCategory = event.target.dataset.category;
        const selectedTag = event.target.dataset.tag;

        updatePostVisibility(selectedCategory, selectedTag, true);
        filterDropdownContent.classList.remove('show');
      });

      filterDropdownButton.addEventListener('click', () => {
        filterDropdownContent.classList.toggle('show');
      });

      window.addEventListener('click', (event) => {
        if (!event.target.matches('.filter-dropdown-button')) {
          if (filterDropdownContent.classList.contains('show')) {
            filterDropdownContent.classList.remove('show');
          }
        }
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
