// Mở/đóng menu trên màn hình di động.
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', () => {
  const isHidden = menu.classList.toggle('hidden');
  menuButton.setAttribute('aria-expanded', String(!isHidden));
  menuButton.textContent = isHidden ? '☰' : '✕';
});

// Khi chọn một mục menu trên di động, đóng menu lại.
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      menu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }
  });
});

// Form minh hoạ: chưa kết nối máy chủ nên chỉ thông báo đã nhận thông tin trên trình duyệt.
document.getElementById('order-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('fullname').value.trim();
  const cake = document.getElementById('cake').value;
  document.getElementById('form-message').textContent =
    `Cảm ơn ${name}! Yêu cầu đặt ${cake} đã được ghi nhận trên trang demo.`;
  event.target.reset();
});
