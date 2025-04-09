document.addEventListener('DOMContentLoaded', function() {
  // 获取DOM元素
  const postItems = document.querySelectorAll('.blog-content .card');
  const categoryCheckboxes = document.querySelectorAll('.sidebar input[data-category]');
  const tagCheckboxes = document.querySelectorAll('.sidebar input[data-tag]');
  const categorySelect = document.getElementById('category-select');
  const tagSelect = document.getElementById('tag-select');

  // ==================== 通用功能 ====================
  
  // 更新URL参数（不刷新页面）
  function updateUrlParams(category, tag) {
    const url = new URL(window.location);
    url.searchParams.set('category', category || '');
    url.searchParams.set('tag', tag || '');
    history.replaceState({}, '', url);
  }

  // 从URL应用筛选参数
  function applyUrlFilters() {
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('category');
    const urlTag = params.get('tag');

    // PC端处理
    if (urlCategory && categoryCheckboxes.length > 0) {
      const categories = urlCategory.split(',');
      categoryCheckboxes.forEach(cb => {
        cb.checked = categories.includes(cb.dataset.category);
      });
    }

    // 移动端处理
    if (urlTag && tagSelect) {
      tagSelect.value = urlTag;
    }

    // 触发筛选
    if (window.innerWidth < 768) {
      updateMobileFilters();
    } else {
      updatePCFilters();
    }
  }

  // ==================== PC端筛选逻辑 ====================
  function updatePCFilters() {
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.category);
    const selectedTags = Array.from(tagCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.dataset.tag);

    // 更新URL
    updateUrlParams(selectedCategories.join(','), selectedTags.join(','));

    // 筛选文章
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

  function initPCCheckboxes() {
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', updatePCFilters));
    tagCheckboxes.forEach(cb => cb.addEventListener('change', updatePCFilters));
  }

  // ==================== 移动端筛选逻辑 ====================
  function updateMobileFilters() {
    const selectedCat = categorySelect.value;
    const selectedTag = tagSelect.value;

    // 更新URL
    updateUrlParams(selectedCat, selectedTag);

    // 筛选文章
    postItems.forEach(item => {
      const showCat = !selectedCat || item.dataset.category.includes(selectedCat);
      const showTag = !selectedTag || item.dataset.tag.includes(selectedTag);
      item.style.display = (showCat && showTag) ? 'block' : 'none';
    });
  }

  function initMobileSelects() {
    // 填充下拉选项
    const uniqueCategories = new Set();
    categoryCheckboxes.forEach(checkbox => {
      if (!uniqueCategories.has(checkbox.dataset.category)) {
        categorySelect.add(new Option(checkbox.dataset.category, checkbox.dataset.category));
        uniqueCategories.add(checkbox.dataset.category);
      }
    });

    const uniqueTags = new Set();
    tagCheckboxes.forEach(checkbox => {
      if (!uniqueTags.has(checkbox.dataset.tag)) {
        tagSelect.add(new Option(checkbox.dataset.tag, checkbox.dataset.tag));
        uniqueTags.add(checkbox.dataset.tag);
      }
    });

    // 绑定事件
    categorySelect.addEventListener('change', updateMobileFilters);
    tagSelect.addEventListener('change', updateMobileFilters);
  }

  // ==================== 初始化 ====================
  function init() {
    if (window.innerWidth < 768) {
      initMobileSelects();
    } else {
      initPCCheckboxes();
    }
    applyUrlFilters(); // 应用URL参数
    
    // 添加面包屑分类链接的点击处理（动态生成的内容）
    document.addEventListener('click', function(e) {
      if (e.target.closest('.breadcrumb a[href*="/blog/?category="]')) {
        e.preventDefault();
        const url = new URL(e.target.href);
        window.location.href = url.href; // 让页面重新加载以应用筛选
      }
    });
  }

  // 响应式处理
  window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
      initMobileSelects();
    } else {
      initPCCheckboxes();
    }
  });

  // 执行初始化
  init();
});
