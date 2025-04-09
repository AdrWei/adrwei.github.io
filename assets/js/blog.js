document.addEventListener('DOMContentLoaded', function() {
    const postItems = document.querySelectorAll('#post-list .card');
    const categoryCheckboxes = document.querySelectorAll('input[data-category]');
    const tagCheckboxes = document.querySelectorAll('input[data-tag]');

    function updatePostVisibility() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.category);

        const selectedTags = Array.from(tagCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.tag);

        postItems.forEach(item => {
            const itemCategories = item.dataset.category.split(',');
            const itemTags = item.dataset.tag.split(',');

            const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(category => itemCategories.includes(category));
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
