const express = require('express');
const path = require('path');
const session = require('express-session');

const pagesRouter = require('./routes/pages');
const productsApiRouter = require('./routes/products');
const authRouter = require('./routes/admin');
const chatRouter = require('./routes/chat');
const logger = require('./middleware/logger');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'ariesta-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(logger);

app.use((req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.user);
  next();
});

app.use('/', pagesRouter);
app.use('/api/products', productsApiRouter);
app.use('/api', authRouter);
app.use('/api', chatRouter);

const PORT = process.env.PORT || 3000;

// Langsung jalankan server tanpa sequelize.sync()
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));