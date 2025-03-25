// 加载 header
fetch('/header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  });

// 加载 footer
fetch('/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;
  });

// 监听 header 滚动事件
function initHeaderScroll() {
  let lastScrollTop = 0;
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // 向下滚动
      header.classList.add('hide');
    } else {
      // 向上滚动
      header.classList.remove('hide');
    }

    lastScrollTop = scrollTop;
  });
}
