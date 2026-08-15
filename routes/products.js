const express = require('express');
const router = express.Router();
const { requireAuthApi } = require('../middleware/auth');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productsController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', requireAuthApi, addProduct);
router.put('/:id', requireAuthApi, updateProduct);
router.delete('/:id', requireAuthApi, deleteProduct);

module.exports = router;