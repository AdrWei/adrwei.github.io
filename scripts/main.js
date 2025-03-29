document.addEventListener('DOMContentLoaded', () => {
  // 加载 header
  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // 修改：手机端导航栏切换
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
      const dropdown = document.querySelector('.dropdown'); // 获取 dropdown 元素

      if (mobileNavToggle && dropdown) {
        mobileNavToggle.addEventListener('click', () => {
          dropdown.classList.toggle('active'); // 切换 dropdown 的 active 类
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

      // 添加 toggle 效果的代码 (修改部分)
      const toggleHeaders = document.querySelectorAll('.toggle-header');

      toggleHeaders.forEach(header => {
        header.addEventListener('click', () => {
          const content = header.nextElementSibling;
          header.classList.toggle('active');
          content.classList.toggle('active');
          header.querySelector('.toggle-icon').textContent = content.classList.contains('active') ? '-' : '+';
        });
      });

      // 添加下拉菜单的代码
      const dropbtn = document.querySelector('.dropbtn');
      const dropdownContent = document.querySelector('.dropdown-content');

      if (dropbtn && dropdownContent) {
        dropbtn.addEventListener('click', (event) => {
          event.stopPropagation(); // 阻止事件冒泡
          dropdownContent.classList.toggle('show');
        });

        window.addEventListener('click', (event) => {
          if (!event.target.matches('.dropbtn')) {
            if (dropdownContent.classList.contains('show')) {
              dropdownContent.classList.remove('show');
            }
          }
        });
      }

      // 添加嵌套下拉菜单的代码
      const nestedDropbtn = document.querySelector('.nested-dropbtn');
      const nestedDropdownContent = document.querySelector('.nested-dropdown-content');

      if (nestedDropbtn && nestedDropdownContent) {
        nestedDropbtn.addEventListener('click', (event) => {
          event.stopPropagation(); // 阻止事件冒泡
          nestedDropdownContent.classList.toggle('show');
        });

        window.addEventListener('click', (event) => {
          if (!event.target.matches('.nested-dropbtn')) {
            if (nestedDropdownContent.classList.contains('show')) {
              nestedDropdownContent.classList.remove('show');
            }
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
