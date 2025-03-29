document.addEventListener('DOMContentLoaded', () => {
  // 加载 header
  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

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

    // 添加嵌套下拉菜单的代码 (保持不变)
    const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    if (dropbtn && dropdownContent) {
      dropbtn.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
      });

      dropbtn.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
      });
    }
  });

  // 添加手机端导航栏切换功能
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('nav');

  if (mobileNavToggle && nav) {
    mobileNavToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});

      // 手机端点击“服务”栏目显示子栏目
      if (window.innerWidth <= 768) {
        const serviceDropdown = document.querySelectorAll('.dropdown')[1]; // 获取“服务”栏目
        const serviceDropdownContent = serviceDropdown.querySelector('.dropdown-content');

        if (serviceDropdown && serviceDropdownContent) {
          serviceDropdown.addEventListener('click', () => {
            serviceDropdownContent.classList.toggle('active');
          });
        }
      }

      // 添加嵌套下拉菜单的代码 (保持不变)
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
