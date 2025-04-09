document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

  // 事件委托
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });
  }

  // 避免重复查询 DOM
  if (window.innerWidth >= 768) {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      // 使用 requestAnimationFrame
      requestAnimationFrame(() => {
        if (scrollTop > lastScrollTop) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
      });
      lastScrollTop = scrollTop;
    });
  }

  const toggleHeaders = document.querySelectorAll('.toggle-header');
  toggleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      header.classList.toggle('active');
      content.classList.toggle('active');
      header.querySelector('.toggle-icon').textContent = content.classList.contains('active') ? '-' : '+';
    });
  });

  // 事件委托
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropbtn')) {
        e.stopPropagation();
        const dropdownContent = e.target.nextElementSibling;
        dropdownContent.classList.toggle('show');
      }
    });
  }
});
