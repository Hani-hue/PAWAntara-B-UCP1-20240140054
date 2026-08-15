const express = require('express');
const router = express.Router();
const { requireAuthPage } = require('../middleware/auth');
// Ubah dari productsController menjadi pagesController:
const {
  getHome,
  getProduk,
  getProdukDetail,
  getTanyaAi,
  getLogin,
  getDashboard
} = require('../controllers/pagesController');

router.get('/', getHome);
router.get('/produk', getProduk);
router.get('/produk/:id', getProdukDetail);
router.get('/tanya-ai', getTanyaAi);
router.get('/login', getLogin);
router.get('/dashboard', requireAuthPage, getDashboard);

module.exports = router;