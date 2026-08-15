const getChatValidationError = (body) => {
  const { message } = body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return 'Pertanyaan gak boleh kosong.';
  }

  return null;
};

module.exports = { getChatValidationError };