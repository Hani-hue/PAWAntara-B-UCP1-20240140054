const getProductValidationError = (body) => {
  const { name, category, price, stock } = body;

  // ===== NAMA =====
  if (typeof name !== 'string' || name.trim() === '') {
    return 'Nama produk wajib diisi.';
  }
  if (name.trim().length < 3 || name.trim().length > 100) {
    return 'Nama produk harus 3–100 karakter.';
  }

  // ===== KATEGORI =====
  if (typeof category !== 'string' || category.trim() === '') {
    return 'Kategori wajib diisi.';
  }
  if (/^\d+$/.test(category.trim())) {
    return 'Kategori harus berupa nama kategori, bukan angka.';
  }
  if (category.trim().length < 2 || category.trim().length > 50) {
    return 'Kategori harus 2–50 karakter.';
  }

  // ===== HARGA =====
  if (price === undefined || price === '' || price === null) {
    return 'Harga wajib diisi.';
  }
  if (isNaN(price)) {
    return 'Harga harus diisi dengan angka, bukan huruf.';
  }
  if (Number(price) <= 0) {
    return 'Harga gak boleh minus atau nol.';
  }
  if (Number(price) > 100000000) {
    return 'Harga gak boleh lebih dari Rp100.000.000.';
  }

  // ===== STOK =====
  if (stock === undefined || stock === '' || stock === null) {
    return 'Stok wajib diisi.';
  }
  if (isNaN(stock)) {
    return 'Stok harus diisi dengan angka, bukan huruf.';
  }
  if (!Number.isInteger(Number(stock))) {
    return 'Stok harus angka bulat, gak boleh desimal.';
  }
  if (Number(stock) < 0) {
    return 'Stok gak boleh minus.';
  }
  if (Number(stock) > 100000) {
    return 'Stok gak boleh lebih dari 100000.';
  }

  return null; // valid
};