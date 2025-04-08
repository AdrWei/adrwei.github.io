document.addEventListener('DOMContentLoaded', () => {
  // ======================
  // 1. 移动端导航切换
  // ======================
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      const nav = document.querySelector('nav');
      nav.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });
  }

  // ======================
  // 2. PC 端滚动隐藏 header
  // ======================
  if (window.innerWidth >= 768) {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle('hidden', scrollTop > lastScrollTop);
      lastScrollTop = scrollTop;
    });
  }

  // ======================
  // 3. Toggle 折叠面板
  // ======================
  document.querySelectorAll('.toggle-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.toggle-icon');
      
      header.classList.toggle('active');
      content.classList.toggle('active');
      if (icon) icon.textContent = content.classList.contains('active') ? '-' : '+';
    });
  });

  // ======================
  // 4. 移动端下拉菜单
  // ======================
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.querySelectorAll('.dropbtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.nextElementSibling.classList.toggle('show');
      });
    });
  }
});
