document.addEventListener('DOMContentLoaded', () => {
// 加载 header
fetch('/header.html')
.then(response => response.text())
.then(data => {
document.getElementById('header').innerHTML = data;

// 在 header 加载完成后，添加切换导航栏的代码
const nav = document.querySelector('nav');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

if (mobileNavToggle) { // 确保 mobileNavToggle 存在，防止报错
mobileNavToggle.addEventListener('click', () => {
nav.classList.toggle('active');
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
