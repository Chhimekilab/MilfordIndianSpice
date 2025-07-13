const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../menu-images')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));

function requireLogin(req, res, next) {
  if (req.session && req.session.loggedIn) return next();
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.loggedIn = true;
    res.redirect('/admin');
  } else {
    res.render('login', { error: 'Invalid password' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

app.get('/admin', requireLogin, (req, res) => {
  res.render('admin-home');
});

app.listen(PORT, () => {
  console.log(`Admin CMS running at http://localhost:${PORT}`);
}); 