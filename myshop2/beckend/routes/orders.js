const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const auth = require('../middleware/auth');
const router = express.Router();

const adapter = new FileSync('data.json');
const db = low(adapter);

db.defaults({ orders: [], users: [] }).write();

// Оформить заказ
router.post('/', auth, (req, res) => {
  const { cart, payment, address } = req.body;
  const order = { id: Date.now(), userId: req.user.id, cart, payment, address, date: new Date() };
  db.get('orders').push(order).write();
  // Добавить заказ в историю пользователя
  db.get('users').find({ id: req.user.id }).get('purchases').push(order).write();
  res.json({ message: 'Order placed', order });
});

// Получить историю покупок пользователя
router.get('/my', auth, (req, res) => {
  const user = db.get('users').find({ id: req.user.id }).value();
  res.json(user.purchases || []);
});

module.exports = router;