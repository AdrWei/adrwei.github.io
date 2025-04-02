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
          mobileNavToggle.classList.toggle('active');
        });
      }

      // PC端添加滚动隐藏 header 的代码
  if (window.innerWidth >= 768) { // 只在电脑端应用
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
  }

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
      document.addEventListener('DOMContentLoaded', function() {
        const navItems = document.querySelectorAll('.nav-item');
      
        navItems.forEach(function(navItem) {
          const dropbtn = navItem.querySelector('.dropbtn');
          const dropdownContent = navItem.querySelector('.dropdown-content');
      
          if (dropbtn && dropdownContent) {
            dropbtn.addEventListener('click', function(event) {
              event.preventDefault(); // 阻止默认跳转
              dropdownContent.classList.toggle('show');
            });
          }
        });
      
        window.addEventListener('click', function(event) {
          navItems.forEach(function(navItem) {
            const dropdownContent = navItem.querySelector('.dropdown-content');
            if (dropdownContent && event.target !== navItem.querySelector('.dropbtn')) {
              dropdownContent.classList.remove('show');
            }
          });
        });
      });

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
