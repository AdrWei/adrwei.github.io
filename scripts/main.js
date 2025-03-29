document.addEventListener('DOMContentLoaded', () => {
  // 加载 header
  fetch('/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;

      // 移除切换导航栏的代码

      // 添加滚动隐藏 header 的代码
      // ... (保持不变)

      // 添加 toggle 效果的代码
      // ... (保持不变)

      // 添加下拉菜单的代码
      // ... (保持不变)

      // 添加嵌套下拉菜单的代码
      // ... (保持不变)
    });

  // 加载 footer
  // ... (保持不变)
});
