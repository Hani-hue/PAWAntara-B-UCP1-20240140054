const express = require('express');
const path = require('path');
const products = require('./data/products');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// FR-08: middleware custom — request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString('id-ID')}] ${req.method} ${req.url}`);
  next();
});

// Beranda — hero + preview produk
app.get('/', (req, res) => {
  res.render('index', { produkPilihan: products.slice(0, 4) });
});

// Produk — daftar + filter lewat query string (?kategori= / ?search=)
app.get('/produk', (req, res) => {
  const { kategori, search } = req.query;
  let hasil = products;

  if (kategori) {
    hasil = hasil.filter((p) => p.category.toLowerCase() === kategori.toLowerCase());
  }
  if (search) {
    hasil = hasil.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const kategoriList = [...new Set(products.map((p) => p.category))];

  res.render('produk', {
    produk: hasil,
    kategoriList,
    kategoriAktif: kategori || '',
    searchAktif: search || '',
  });
});

// Detail produk — route dinamis, tangani ID tidak ditemukan tanpa crash
app.get('/produk/:id', (req, res) => {
  const produk = products.find((p) => p.id === Number(req.params.id));
  res.render('produk-detail', { produk });
});

// Tanya AI — tampilan chat + form (logic balasan baru di Sprint 2)
app.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai');
});

// REST API read-only, fondasi buat CRUD penuh di Sprint 2
app.get('/api/products', (req, res) => {
  res.json({ status: 'success', data: products });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
