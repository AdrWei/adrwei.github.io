document.addEventListener('DOMContentLoaded', () => {
  // 加载 header
  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // 在 header 加载完成后，添加切换导航栏的代码
      const nav = document.querySelector('nav');
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

      if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
          nav.classList.toggle('active');
        });
      }

      // 添加滚动隐藏 header 的代码
      let lastScrollTop = 0;

      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');

        if (scrollTop > lastScrollTop) {
          // 向下滚动
          header.classList.add('hidden');
        } else {
          // 向上滚动
          header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
      });

      // 添加 toggle 效果的代码
      const toggleHeader = document.querySelector('.toggle-header');
      const toggleContent = document.querySelector('.toggle-content');
      const toggleIcon = document.querySelector('.toggle-icon');

      if (toggleHeader && toggleContent && toggleIcon) { // 确保元素存在
        toggleHeader.addEventListener('click', () => {
          if (toggleContent.style.display === 'block') {
            toggleContent.style.display = 'none';
            toggleIcon.textContent = '+';
          } else {
            toggleContent.style.display = 'block';
            toggleIcon.textContent = '-';
          }
        });
      }
    });

  // 加载 footer
  fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});
