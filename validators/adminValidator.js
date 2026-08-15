const getLoginValidationError = (body) => {
  const { username, password } = body;

  if (!username || typeof username !== 'string' || username.trim() === '') {
    return 'Username wajib diisi.';
  }
  if (!password || typeof password !== 'string' || password.trim() === '') {
    return 'Password wajib diisi.';
  }

  return null;
};

module.exports = { getLoginValidationError };