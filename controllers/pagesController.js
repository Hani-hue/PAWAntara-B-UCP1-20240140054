const productsData = require('../data/products');

// 1. Halaman Beranda (Home)
const getHome = (req, res) => {
  try {
    const produkPilihan = productsData.slice(0, 4);
    res.render('index', { produkPilihan });
  } catch (err) {
    console.error(err);
    res.render('index', { produkPilihan: [] });
  }
};

// 2. Halaman Katalog Produk
const getProduk = (req, res) => {
  try {
    const kategoriList = [...new Set(productsData.map((p) => p.category))];
    res.render('produk', { kategoriList });
  } catch (err) {
    console.error(err);
    res.render('produk', { kategoriList: [] });
  }
};

// 3. Halaman Detail Produk
const getProdukDetail = (req, res) => {
  try {
    const produk = productsData.find((p) => p.id === Number(req.params.id));
    res.render('produk-detail', { produk });
  } catch (err) {
    console.error(err);
    res.render('produk-detail', { produk: null });
  }
};

// 4. Halaman Tanya AI
const getTanyaAi = (req, res) => {
  res.render('tanya-ai');
};

// 5. Halaman Login
const getLogin = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('login');
};

// 6. Halaman Dashboard Admin
const getDashboard = (req, res) => {
  res.render('dashboard');
};

module.exports = {
  getHome,
  getProduk,
  getProdukDetail,
  getTanyaAi,
  getLogin,
  getDashboard
};