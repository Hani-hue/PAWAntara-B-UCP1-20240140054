const { getChatValidationError } = require('../validators/chatValidator');

// Logic balasan (tetap ada di dalam controller, bisa ditaruh di utils jika mau lebih rapi lagi)
function getDummyReply(message) {
  const m = message.toLowerCase();

  if (/(jam buka|buka jam|jam berapa|tutup jam)/.test(m)) {
    return 'Toko kami buka setiap hari jam 07.00 - 20.00 WIB!';
  }
  if (/(ongkir|antar|kirim|diantar)/.test(m)) {
    return 'Bisa diantar untuk area sekitar toko, ongkirnya tergantung jarak. Hubungi kami buat detailnya ya!';
  }
  if (/(bayar|pembayaran|transfer|cod|cash)/.test(m)) {
    return 'Pembayaran bisa cash langsung di toko atau transfer bank.';
  }
  if (/(stok|tersedia|ada ga|ada gak|kosong)/.test(m)) {
    return 'Cek langsung stoknya di halaman Produk ya, datanya selalu update tiap saat!';
  }

  return 'Maaf, aku belum ngerti pertanyaan itu. Coba tanya soal jam buka, ongkir, cara pembayaran, atau ketersediaan stok ya!';
}

const chat = (req, res) => {
  // Validasi input
  const validationError = getChatValidationError(req.body);
  if (validationError) {
    return res.status(400).json({ status: 'error', message: validationError });
  }

  // Proses balasan
  const { message } = req.body;
  const reply = getDummyReply(message);
  res.json({ status: 'success', data: { reply } });
};

module.exports = { chat };