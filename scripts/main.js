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

      // 修改后的手机下拉代码
      const dropbtns = document.querySelectorAll('.dropbtn'); // 选择所有下拉按钮
      
      dropbtns.forEach(dropbtn => {
          const dropdownContent = dropbtn.nextElementSibling; // 获取下拉菜单内容
      
          if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) { // 确保内容存在且是下拉菜单
              dropbtn.addEventListener('click', (event) => {
                  event.stopPropagation(); // 阻止事件冒泡
                  dropdownContent.classList.toggle('show'); // 切换下拉菜单的显示状态
              });
          }
      });
      
      window.addEventListener('click', (event) => {
          const isDropbtnClick = Array.from(dropbtns).some(dropbtn => dropbtn.contains(event.target)); //检查点击事件是否发生在任何dropbtn内。
          if (!isDropbtnClick) {
              document.querySelectorAll('.dropdown-content.show').forEach(content => {
                  content.classList.remove('show');
              });
          }
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
