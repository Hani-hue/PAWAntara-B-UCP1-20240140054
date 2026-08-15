const form = document.getElementById('login-form');
const errorEl = document.getElementById('login-error');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameField.value.trim();
  const password = passwordField.value;

  if (!username || !password) {
    errorEl.textContent = 'Username dan password wajib diisi.';
    errorEl.hidden = false;
    return;
  }

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();

    if (json.status === 'success') {
      window.location.href = '/dashboard';
    } else {
      errorEl.textContent = json.message;
      errorEl.hidden = false;
    }
  } catch (err) {
    errorEl.textContent = 'Gagal menghubungi server, coba lagi.';
    errorEl.hidden = false;
  }
});
