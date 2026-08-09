const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const admin = require('../data/admin');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: 'error', message: 'Username dan password wajib diisi' });
  }

  const valid = username === admin.username && bcrypt.compareSync(password, admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ status: 'error', message: 'Username atau password salah' });
  }

  req.session.user = { username };
  res.json({ status: 'success', message: 'Login berhasil' });
});

