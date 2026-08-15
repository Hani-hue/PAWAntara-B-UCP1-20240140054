// Satu guard dipake bareng untuk semua endpoint/route yang butuh login,
// biar gak ada pengecekan sesi yang ke-skip di salah satu caller.

function requireAuthApi(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized, silakan login terlebih dahulu' });
  }
  next();
}

function requireAuthPage(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

module.exports = { requireAuthApi, requireAuthPage };
