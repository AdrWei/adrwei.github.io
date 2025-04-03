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

    // 检测是否为移动端
    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
    
    // 仅针对移动端绑定点击事件
    if (isMobile()) {
        const dropbtns = document.querySelectorAll('.dropbtn');
        
        dropbtns.forEach(dropbtn => {
            const dropdownContent = dropbtn.nextElementSibling;
            
            if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
                // 点击按钮切换菜单
                dropbtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdownContent.classList.toggle('show');
                });
                
                // 点击菜单内链接不关闭菜单
                dropdownContent.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            }
        });
        
        // 点击页面其他区域关闭所有菜单
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-content.show').forEach(menu => {
                menu.classList.remove('show');
            });
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
