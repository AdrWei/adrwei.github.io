document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 加载 header
    const headerResponse = await fetch('/header.html');
    const headerData = await headerResponse.text();
    document.getElementById('header').innerHTML = headerData;

    // header 加载完成后执行其他 JavaScript 代码
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

    // 添加下拉菜单的代码
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

    // 添加嵌套下拉菜单的代码
    const nestedDropbtn = document.querySelector('.nested-dropbtn');
    const nestedDropdownContent = document.querySelector('.nested-dropdown-content');

    if (nestedDropbtn && nestedDropdownContent) {
      nestedDropbtn.addEventListener('click', (event) => {
        event.stopPropagation(); // 阻止事件冒泡
        nestedDropdownContent.classList.toggle('show');
      });

      document.body.addEventListener('click', (event) => {
        if (!event.target.matches('.nested-dropbtn')) {
          if (nestedDropdownContent.classList.contains('show')) {
            nestedDropdownContent.classList.remove('show');
          }
        }
      });
    }
  } catch (error) {
    console.error('加载 header 出错:', error);
  }

  try {
    // 加载 footer
    const footerResponse = await fetch('/footer.html');
    const footerData = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerData;
  } catch (error) {
    console.error('加载 footer 出错:', error);
  }
});
