const grid = document.getElementById('produk-grid');
const emptyState = document.getElementById('produk-empty');
const form = document.getElementById('filter-form');
const searchField = document.getElementById('search');
const kategoriField = document.getElementById('kategori');

function renderProducts(items) {
  grid.innerHTML = '';
  emptyState.hidden = items.length > 0;

  items.forEach((p) => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.innerHTML = `
      <div class="price-tag" aria-hidden="true">Rp${p.price.toLocaleString('id-ID')}</div>
      <p class="product-category"></p>
      <h2><a href="/produk/${p.id}"></a></h2>
      <p class="product-stock"></p>
    `;
    article.querySelector('.product-category').textContent = p.category;
    article.querySelector('h2 a').textContent = p.name;
    article.querySelector('.product-stock').textContent = `Stok: ${p.stock}`;
    grid.appendChild(article);
  });
}

async function loadProducts() {
  const params = new URLSearchParams();
  if (searchField.value.trim()) params.set('search', searchField.value.trim());
  if (kategoriField.value) params.set('kategori', kategoriField.value);

  const res = await fetch(`/api/products?${params.toString()}`);
  const json = await res.json();
  renderProducts(json.data);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  loadProducts();
});

// dukung akses langsung kayak /produk?kategori=Bumbu dari link luar
const initial = new URLSearchParams(window.location.search);
if (initial.get('search')) searchField.value = initial.get('search');
if (initial.get('kategori')) kategoriField.value = initial.get('kategori');

loadProducts();
