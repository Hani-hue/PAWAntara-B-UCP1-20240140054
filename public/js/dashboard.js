const tableBody = document.getElementById('product-table-body');
const form = document.getElementById('product-form');
const idField = document.getElementById('product-id');
const nameField = document.getElementById('name');
const categoryField = document.getElementById('category');
const priceField = document.getElementById('price');
const stockField = document.getElementById('stock');
const errorEl = document.getElementById('product-error');
const submitBtn = document.getElementById('product-submit');
const cancelBtn = document.getElementById('product-cancel');

async function loadProducts() {
  const res = await fetch('/api/products');
  const json = await res.json();
  tableBody.innerHTML = '';

  json.data.forEach((p) => {
    const tr = document.createElement('tr');

    const cells = [p.name, p.category, `Rp${p.price.toLocaleString('id-ID')}`, String(p.stock)];
    cells.forEach((text) => {
      const td = document.createElement('td');
      td.textContent = text;
      tr.appendChild(td);
    });

    const actionTd = document.createElement('td');
    actionTd.innerHTML = `
      <button type="button" data-action="edit" data-id="${p.id}">Edit</button>
      <button type="button" data-action="delete" data-id="${p.id}">Hapus</button>
    `;
    tr.appendChild(actionTd);

    tableBody.appendChild(tr);
  });
}

function resetForm() {
  form.reset();
  idField.value = '';
  submitBtn.textContent = 'Tambah produk';
  cancelBtn.hidden = true;
  errorEl.hidden = true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameField.value.trim();
  const category = categoryField.value.trim();
  const price = priceField.value;
  const stock = stockField.value;
  const isEdit = Boolean(idField.value);

  // ===== NAMA =====
  if (!name) {
    errorEl.textContent = 'Nama produk wajib diisi.';
    errorEl.hidden = false;
    return;
  }
  if (name.length < 3 || name.length > 100) {
    errorEl.textContent = 'Nama produk harus 3–100 karakter.';
    errorEl.hidden = false;
    return;
  }

  // ===== KATEGORI =====
  if (!category) {
    errorEl.textContent = 'Kategori wajib diisi.';
    errorEl.hidden = false;
    return;
  }
  if (/^\d+$/.test(category)) {
    errorEl.textContent = 'Kategori harus berupa nama kategori, bukan angka.';
    errorEl.hidden = false;
    return;
  }
  if (category.length < 2 || category.length > 50) {
    errorEl.textContent = 'Kategori harus 2–50 karakter.';
    errorEl.hidden = false;
    return;
  }

  // ===== HARGA =====
  if (priceField.validity.badInput) {
    errorEl.textContent = 'Harga harus diisi dengan angka, bukan huruf.';
    errorEl.hidden = false;
    return;
  }
  if (price === '') {
    errorEl.textContent = 'Harga wajib diisi.';
    errorEl.hidden = false;
    return;
  }
  if (isNaN(price)) {
    errorEl.textContent = 'Harga harus diisi dengan angka, bukan huruf.';
    errorEl.hidden = false;
    return;
  }
  if (Number(price) <= 0) {
    errorEl.textContent = 'Harga gak boleh minus atau nol.';
    errorEl.hidden = false;
    return;
  }
  if (Number(price) > 100000000) {
    errorEl.textContent = 'Harga gak boleh lebih dari Rp100.000.000.';
    errorEl.hidden = false;
    return;
  }

  // ===== STOK =====
  if (stockField.validity.badInput) {
    errorEl.textContent = 'Stok harus diisi dengan angka, bukan huruf.';
    errorEl.hidden = false;
    return;
  }
  if (stock === '') {
    errorEl.textContent = 'Stok wajib diisi.';
    errorEl.hidden = false;
    return;
  }
  if (isNaN(stock)) {
    errorEl.textContent = 'Stok harus diisi dengan angka, bukan huruf.';
    errorEl.hidden = false;
    return;
  }
  if (!Number.isInteger(Number(stock))) {
    errorEl.textContent = 'Stok harus angka bulat, gak boleh desimal.';
    errorEl.hidden = false;
    return;
  }
  if (Number(stock) < 0) {
    errorEl.textContent = 'Stok gak boleh minus.';
    errorEl.hidden = false;
    return;
  }
  if (Number(stock) > 100000) {
    errorEl.textContent = 'Stok gak boleh lebih dari 100000.';
    errorEl.hidden = false;
    return;
  }

  const id = idField.value;
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/products/${id}` : '/api/products';

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, category, price: Number(price), stock: Number(stock) }),
  });
  const json = await res.json();

  if (json.status !== 'success') {
    errorEl.textContent = json.message;
    errorEl.hidden = false;
    return;
  }

  resetForm();
  loadProducts();
  showAlert(isEdit ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.');
});

cancelBtn.addEventListener('click', resetForm);

tableBody.addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.dataset.action === 'delete') {
    if (!confirm('Yakin mau hapus produk ini?')) return;
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    const json = await res.json();
    loadProducts();
    showAlert(json.status === 'success' ? 'Produk berhasil dihapus.' : json.message);
  }

  if (btn.dataset.action === 'edit') {
    const res = await fetch(`/api/products/${id}`);
    const json = await res.json();
    if (json.status !== 'success') return;

    idField.value = json.data.id;
    nameField.value = json.data.name;
    categoryField.value = json.data.category;
    priceField.value = json.data.price;
    stockField.value = json.data.stock;
    submitBtn.textContent = 'Update produk';
    cancelBtn.hidden = false;
  }
});

loadProducts();