const productsData = require('../data/products');

const findAll = ({ kategori, search } = {}) => {
  let result = [...productsData];
  if (kategori) {
    result = result.filter(p => p.category.toLowerCase() === kategori.toLowerCase());
  }
  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  return result;
};

const findById = (id) => productsData.find(p => p.id === Number(id));

const create = ({ name, category, price, stock }) => {
  const newProduct = {
    id: productsData.length > 0 ? productsData[productsData.length - 1].id + 1 : 1,
    name: name.trim(),
    category: category.trim(),
    price: Number(price),
    stock: Number(stock)
  };
  productsData.push(newProduct);
  return newProduct;
};

const update = (id, { name, category, price, stock }) => {
  const index = productsData.findIndex(p => p.id === Number(id));
  if (index === -1) return null;

  productsData[index] = {
    ...productsData[index],
    name: name.trim(),
    category: category.trim(),
    price: Number(price),
    stock: Number(stock)
  };
  return productsData[index];
};

const remove = (id) => {
  const index = productsData.findIndex(p => p.id === Number(id));
  if (index === -1) return false;
  productsData.splice(index, 1);
  return true;
};

module.exports = { findAll, findById, create, update, remove };