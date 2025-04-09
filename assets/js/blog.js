document.addEventListener('DOMContentLoaded', function() {
  // DOM元素
  const postItems = document.querySelectorAll('.blog-content .card');
  const categoryCheckboxes = document.querySelectorAll('.sidebar input[data-category]');
  const tagCheckboxes = document.querySelectorAll('.sidebar input[data-tag]');
  const categorySelect = document.getElementById('category-select');
  const tagSelect = document.getElementById('tag-select');

  // ==================== PC端：复选框筛选逻辑 ====================
  function initPCCheckboxes() {
    function updatePCFilters() {
      const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.dataset.category);
      const selectedTags = Array.from(tagCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.dataset.tag);

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
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', updatePCFilters));
    tagCheckboxes.forEach(cb => cb.addEventListener('change', updatePCFilters));
  }

  // ==================== 移动端：下拉菜单筛选逻辑 ====================
  function initMobileSelects() {
    // 动态填充下拉选项（从PC端复选框同步数据）
    categoryCheckboxes.forEach(checkbox => {
      categorySelect.add(new Option(checkbox.dataset.category, checkbox.dataset.category));
    });
    tagCheckboxes.forEach(checkbox => {
      tagSelect.add(new Option(checkbox.dataset.tag, checkbox.dataset.tag));
    });

    // 筛选函数
    function updateMobileFilters() {
      const selectedCat = categorySelect.value;
      const selectedTag = tagSelect.value;

      postItems.forEach(item => {
        const showCat = !selectedCat || item.dataset.category.includes(selectedCat);
        const showTag = !selectedTag || item.dataset.tag.includes(selectedTag);
        item.style.display = (showCat && showTag) ? 'block' : 'none';
      });
    }

    // 绑定事件
    categorySelect.addEventListener('change', updateMobileFilters);
    tagSelect.addEventListener('change', updateMobileFilters);
  }

  // ==================== 响应式初始化 ====================
  function init() {
    if (window.innerWidth < 768) {
      initMobileSelects(); // 移动端
    } else {
      initPCCheckboxes();  // PC端
    }
  }

  // 窗口大小变化时重新初始化
  window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
      initMobileSelects();
    } else {
      initPCCheckboxes();
    }
  });

  // 首次加载初始化
  init();
});
