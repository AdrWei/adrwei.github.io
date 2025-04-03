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

// 检测移动端
const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

if (isMobile()) {
    const dropbtns = document.querySelectorAll('.dropbtn');
    let currentOpenMenu = null; // 跟踪当前打开的菜单

    dropbtns.forEach(dropbtn => {
        const dropdownContent = dropbtn.nextElementSibling;

        if (dropdownContent?.classList.contains('dropdown-content')) {
            // 点击按钮：切换当前菜单
            dropbtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // 关闭其他菜单（如果需要）
                if (currentOpenMenu && currentOpenMenu !== dropdownContent) {
                    currentOpenMenu.classList.remove('show');
                }
                
                // 切换当前菜单
                dropdownContent.classList.toggle('show');
                currentOpenMenu = dropdownContent.classList.contains('show') 
                    ? dropdownContent 
                    : null;
            });

            // 菜单内部点击：完全阻止任何关闭行为
            dropdownContent.addEventListener('click', (e) => {
                e.stopPropagation(); // 阻止冒泡到document
                return false;       // 额外保险
            });
        }
    });

    // 禁用全局点击关闭（关键改动！）
    // 无 document.addEventListener 逻辑！
}
      
    });

  // 加载 footer
  fetch('/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});
