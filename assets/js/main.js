document.addEventListener('DOMContentLoaded', () => {
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

  // 移动端才需要绑定点击事件（保持PC端hover不变）
  if (window.matchMedia("(max-width: 768px)").matches) {
    const dropbtns = document.querySelectorAll('.dropbtn');
    
    dropbtns.forEach(dropbtn => {
      dropbtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        const dropdownContent = dropbtn.nextElementSibling;
        dropdownContent.classList.toggle('show'); // 你的核心逻辑
      });
    });
  }
});
