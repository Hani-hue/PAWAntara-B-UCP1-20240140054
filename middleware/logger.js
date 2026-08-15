// middleware/logger.js
const logger = (req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString('id-ID')}] ${req.method} ${req.url}`);
  next();
};

module.exports = logger;