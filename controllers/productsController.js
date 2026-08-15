const productModel = require('../models/Products');
const { getProductValidationError } = require('../validators/productValidator');

const getProducts = (req, res) => {
  try {
    const result = productModel.findAll(req.query);
    res.json({ status: 'success', data: result });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Gagal mengambil data' });
  }
};

const getProductById = (req, res) => {
  try {
    const product = productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
    res.json({ status: 'success', data: product });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

const addProduct = (req, res) => {
  const validationError = getProductValidationError(req.body);
  if (validationError) return res.status(400).json({ status: 'error', message: validationError });

  try {
    const newProduct = productModel.create(req.body);
    res.json({ status: 'success', message: 'Produk ditambahkan', data: newProduct });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Gagal menambah' });
  }
};

const updateProduct = (req, res) => {
  const validationError = getProductValidationError(req.body);
  if (validationError) return res.status(400).json({ status: 'error', message: validationError });

  try {
    const updated = productModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
    res.json({ status: 'success', message: 'Produk diperbarui', data: updated });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Gagal update' });
  }
};

const deleteProduct = (req, res) => {
  try {
    const deleted = productModel.remove(req.params.id);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
    res.json({ status: 'success', message: 'Produk dihapus' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Gagal menghapus' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};