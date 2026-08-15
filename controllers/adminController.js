const bcrypt = require('bcryptjs');
const admin = require('../data/admin');
const { getLoginValidationError } = require('../validators/adminValidator');

const login = (req, res) => {
  const validationError = getLoginValidationError(req.body);
  if (validationError) {
    return res.status(400).json({ status: 'error', message: validationError });
  }

  const { username, password } = req.body;
  const valid = username === admin.username && bcrypt.compareSync(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ status: 'error', message: 'Username atau password salah' });
  }

  req.session.user = { username };
  res.json({ status: 'success', message: 'Login berhasil' });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ status: 'success', message: 'Logout berhasil' });
  });
};

module.exports = { login, logout };