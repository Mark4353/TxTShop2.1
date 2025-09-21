const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const router = express.Router();

const adapter = new FileSync('data.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Регистрация
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (db.get('users').find({ email }).value()) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  // Роль всегда user, даже если в body передали другое
  const user = { id: Date.now(), username, email, password: hash, purchases: [], role: 'user' };
  db.get('users').push(user).write();
  res.json({ message: 'Registered' });
});

// Логин
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.get('users').find({ email }).value();
  if (!user) return res.status(400).json({ error: 'User not found' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Wrong password' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email, purchases: user.purchases, role: user.role } });
});

// Добавьте временно в конец файла:
router.post('/create-admin', async (req, res) => {
  const { username, email, password } = req.body;
  if (db.get('users').find({ email }).value()) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), username, email, password: hash, purchases: [], role: 'admin007' };
  db.get('users').push(user).write();
  res.json({ message: 'Admin created' });
});

module.exports = router;