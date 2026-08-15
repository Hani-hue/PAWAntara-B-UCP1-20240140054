// ===== Navbar, logout, alert modal (dipake bareng oleh login.js, dashboard.js, dll) =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  });
}

function showAlert(message) {
  const modal = document.getElementById('alert-modal');
  const messageEl = document.getElementById('alert-modal-message');
  if (!modal || !messageEl) return;
  messageEl.textContent = message;
  modal.hidden = false;
}

const alertCloseBtn = document.getElementById('alert-modal-close');
if (alertCloseBtn) {
  alertCloseBtn.addEventListener('click', () => {
    document.getElementById('alert-modal').hidden = true;
  });
}