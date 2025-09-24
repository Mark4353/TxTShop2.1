const express = require("express");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const auth = require("../middleware/auth");
const router = express.Router();

const adapter = new FileSync("db.json");
const db = low(adapter);

// Получить все новые продукты
router.get("/new", (req, res) => {
  res.json(db.get("products").value());
});

// Получить все б/у продукты
router.get("/used", (req, res) => {
  res.json(db.get("used").value());
});

// Получить все товары (new + used)
router.get("/", (req, res) => {
  const products = db.get("products").value() || [];
  const used = db.get("used").value() || [];
  res.json([...products, ...used]);
});

// Добавить новый продукт (new)
router.post("/new", auth, (req, res) => {
  if (req.user.role !== "admin007")
    return res.status(403).json({ error: "Forbidden" });
  const product = { ...req.body, id: Date.now() };
  db.get("products").push(product).write();
  res.json(product);
});

// Добавить б/у продукт (used)
router.post("/used", auth, (req, res) => {
  if (req.user.role !== "admin007")
    return res.status(403).json({ error: "Forbidden" });
  const product = { ...req.body, id: Date.now(), category: "used" };
  db.get("used").push(product).write();
  res.json(product);
});

// Удалить новый продукт
router.delete("/new/:id", auth, (req, res) => {
  if (req.user.role !== "admin007")
    return res.status(403).json({ error: "Forbidden" });
  const id = Number(req.params.id);
  db.get("products").remove({ id }).write();
  res.json({ success: true });
});

// Удалить б/у продукт
router.delete("/used/:id", auth, (req, res) => {
  if (req.user.role !== "admin007")
    return res.status(403).json({ error: "Forbidden" });
  const id = Number(req.params.id);
  db.get("used").remove({ id }).write();
  res.json({ success: true });
});

// Изменить новый продукт
router.put("/new/:id", auth, (req, res) => {
  if (req.user.role !== "admin007")
    return res.status(403).json({ error: "Forbidden" });
  const id = Number(req.params.id);
  const product = db.get("products").find({ id }).assign(req.body).write();
  res.json(product);
});

// Изменить б/у продукт
router.put("/used/:id", auth, (req, res) => {
  if (req.user.role !== "admin007")
    return res.status(403).json({ error: "Forbidden" });
  const id = Number(req.params.id);
  const product = db.get("used").find({ id }).assign(req.body).write();
  res.json(product);
});

module.exports = router;
