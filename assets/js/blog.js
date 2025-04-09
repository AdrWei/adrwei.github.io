document.addEventListener('DOMContentLoaded', function() {
    const postItems = document.querySelectorAll('.blog-content #post-list .card');
    const categoryCheckboxes = document.querySelectorAll('.sidebar input[data-category]');
    const tagCheckboxes = document.querySelectorAll('.sidebar input[data-tag]');
    const categorySelect = document.getElementById('category-select');
    const tagSelect = document.getElementById('tag-select');

    // 动态生成下拉菜单选项
    function generateFilterOptions() {
        // 清空现有选项（保留默认选项）
        categorySelect.innerHTML = '<option value="">所有类别</option>';
        tagSelect.innerHTML = '<option value="">所有标签</option>';

        // 添加类别选项
        categoryCheckboxes.forEach(checkbox => {
            const option = document.createElement('option');
            option.value = checkbox.dataset.category;
            option.textContent = checkbox.dataset.category;
            categorySelect.appendChild(option);
        });

        // 添加标签选项
        tagCheckboxes.forEach(checkbox => {
            const option = document.createElement('option');
            option.value = checkbox.dataset.tag;
            option.textContent = checkbox.dataset.tag;
            tagSelect.appendChild(option);
        });
    }

    // 更新文章可见性
    function updatePostVisibility(selectedCategories, selectedTags, isMobile) {
        postItems.forEach(item => {
            const itemCategories = item.dataset.category ? item.dataset.category.split(',') : [];
            const itemTags = item.dataset.tag ? item.dataset.tag.split(',') : [];

            const categoryMatch = isMobile
                ? !selectedCategories || itemCategories.includes(selectedCategories)
                : selectedCategories.length === 0 || selectedCategories.some(cat => itemCategories.includes(cat));

            const tagMatch = isMobile
                ? !selectedTags || itemTags.includes(selectedTags)
                : selectedTags.length === 0 || selectedTags.some(tag => itemTags.includes(tag));

            item.style.display = categoryMatch && tagMatch ? 'block' : 'none';
        });
    }

    // 初始化
    function init() {
        const isMobile = window.innerWidth < 768;
        generateFilterOptions();

        if (isMobile) {
            // 手机端：下拉菜单筛选
            categorySelect.addEventListener('change', () => {
                updatePostVisibility(categorySelect.value, tagSelect.value, true);
            });

            tagSelect.addEventListener('change', () => {
                updatePostVisibility(categorySelect.value, tagSelect.value, true);
            });
        } else {
            // PC端：复选框筛选
            categoryCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const selectedCategories = Array.from(categoryCheckboxes)
                        .filter(cb => cb.checked)
                        .map(cb => cb.dataset.category);
                    const selectedTags = Array.from(tagCheckboxes)
                        .filter(cb => cb.checked)
                        .map(cb => cb.dataset.tag);
                    updatePostVisibility(selectedCategories, selectedTags, false);
                });
            });

            tagCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    const selectedCategories = Array.from(categoryCheckboxes)
                        .filter(cb => cb.checked)
                        .map(cb => cb.dataset.category);
                    const selectedTags = Array.from(tagCheckboxes)
                        .filter(cb => cb.checked)
                        .map(cb => cb.dataset.tag);
                    updatePostVisibility(selectedCategories, selectedTags, false);
                });
            });
        }
    }

    // 响应式处理（窗口大小变化时切换模式）
    window.addEventListener('resize', () => {
        init(); // 重新初始化
    });

    init(); // 首次加载初始化
});
