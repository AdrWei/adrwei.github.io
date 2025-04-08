document.addEventListener('DOMContentLoaded', () => {
  // 1. 确保header/footer已存在（兼容Jekyll include和JS加载）
  const initComponents = () => {
    // 移动端导航切换
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        nav?.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
        document.body.style.overflow = nav?.classList.contains('active') ? 'hidden' : '';
      });
    }

    // PC端滚动隐藏header
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
        if (scrollTop > 100) { // 添加阈值防止误判
          header?.classList.toggle('hidden', scrollTop > lastScrollTop);
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 修复顶部反弹
      }
    };
    let lastScrollTop = 0;
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Toggle面板（兼容新旧版本）
    document.querySelectorAll('.toggle-header').forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        header.classList.toggle('active');
        content?.classList.toggle('active');
        const icon = header.querySelector('.toggle-icon');
        if (icon) icon.textContent = content?.classList.contains('active') ? '-' : '+';
      });
    });

    // 响应式检测（处理设备旋转）
    const checkMobile = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        document.querySelectorAll('.dropbtn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.nextElementSibling?.classList.toggle('show');
          });
        });
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
  };

  // 2. 兼容两种加载方式
  if (document.querySelector('#header')) {
    // JS加载模式
    fetch('/header.html')
      .then(r => r.text())
      .then(html => {
        document.getElementById('header').innerHTML = html;
        initComponents();
      });
  } else {
    // Jekyll include模式
    initComponents();
  }
});
