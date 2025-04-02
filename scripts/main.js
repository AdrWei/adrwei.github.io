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
        const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(function(navItem) {
    const dropbtn = navItem.querySelector('.dropbtn');
    const dropdownContent = navItem.querySelector('.dropdown-content');

    if (dropbtn && dropdownContent) {
      if (window.innerWidth >= 768) {
        // PC 端 hover 事件
        navItem.addEventListener('mouseenter', () => {
          dropdownContent.style.display = 'block';
        });

        navItem.addEventListener('mouseleave', () => {
          dropdownContent.style.display = 'none';
        });
      } else {
        // 手机端点击事件
        dropbtn.addEventListener('click', function(event) {
          event.preventDefault();
          dropdownContent.classList.toggle('show');
          console.log('dropbtn clicked', event.target);
        });
      }
    }
  });

  window.addEventListener('click', function(event) {
    navItems.forEach(function(navItem) {
      const dropdownContent = navItem.querySelector('.dropdown-content');
      if (
        window.innerWidth < 768 &&
        dropdownContent &&
        event.target !== navItem.querySelector('.dropbtn')
      ) {
        dropdownContent.classList.remove('show');
      }
      console.log('window clicked', event.target);
    });
  });

  // 加载 footer
  fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});
