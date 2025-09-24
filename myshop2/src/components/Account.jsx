import React, { useState, useEffect } from "react";

function Account({ show, onClose, user, onLogout, cartItems }) {
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [activeTab, setActiveTab] = useState("profile");
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);
  const [showAdmin, setShowAdmin] = useState(false);

  // Загружаем пользователя из localStorage при открытии модалки
  useEffect(() => {
    if (show) {
      const savedUser = localStorage.getItem("accountUser");
      if (savedUser) {
        setRegistered(true);
      }
      setActiveTab("profile");
      setPage(1);
    }
  }, [show]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = e => {
    e.preventDefault();
    if (form.name && form.email && form.password) {
      setRegistered(true);
      localStorage.setItem("accountUser", JSON.stringify({ name: form.name, email: form.email }));
    }
  };

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const visibleItems = cartItems.slice(startIdx, startIdx + itemsPerPage);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!show) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content account-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>Закрыть</button>
        {user ? (
          <>
            <h2>Личный кабинет</h2>
            <div className="account-tabs">
              <button
                className={`account-tab${activeTab === "profile" ? " active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Профиль
              </button>
              <button
                className={`account-tab${activeTab === "cart" ? " active" : ""}`}
                onClick={() => setActiveTab("cart")}
              >
                Корзина
              </button>
              <button
                className={`account-tab${activeTab === "bonus" ? " active" : ""}`}
                onClick={() => setActiveTab("bonus")}
              >
                Бонусы
              </button>
            </div>
            {activeTab === "profile" && (
              <div className="account-info">
                <p><b>Имя:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Статус:</b> Новичок</p>
                <button className="account-exit-btn" onClick={onLogout}>Выйти</button>
              </div>
            )}
            {activeTab === "cart" && (
              <div className="account-cart">
                <h3>Ваша корзина</h3>
                {cartItems.length === 0 ? (
                  <p>Корзина пуста</p>
                ) : (
                  <>
                    <ul>
                      {visibleItems.map((item, idx) => (
                        <li key={startIdx + idx}>
                          {item.name} — ₴{item.price}
                        </li>
                      ))}
                    </ul>
                    {totalPages > 1 && (
                      <div className="cart-pagination">
                        <button
                          onClick={() => setPage(page - 1)}
                          disabled={page === 1}
                          className="cart-page-btn"
                        >
                          &lt;
                        </button>
                        <span className="cart-page-indicator">
                          Страница {page} из {totalPages}
                        </span>
                        <button
                          onClick={() => setPage(page + 1)}
                          disabled={page === totalPages}
                          className="cart-page-btn"
                        >
                          &gt;
                        </button>
                      </div>
                    )}
                    <div className="cart-total">
                      <b>Сумма к оплате:</b> ₴{total}
                    </div>
                  </>
                )}
              </div>
            )}
            {activeTab === "bonus" && (
              <div className="account-extra">
                <h3>Бонусы</h3>
                <p>Ваша скидка: <b>5%</b> на следующий заказ!</p>
                <p>Статус: <b>Новичок</b></p>
                <p>Бонусных баллов: <b>100</b></p>
              </div>
            )}
            {/* Кнопка только для админа */}
            {user && user.role === 'admin007' && (
              <button onClick={() => setShowAdmin(true)}>Админ-панель</button>
            )}
          </>
        ) : (
          <>
            <h2>Регистрация</h2>
            <form className="account-form" onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button className="cart-pay-button" type="submit">
                Зарегистрироваться
              </button>
            </form>
          </>
        )}
      </div>
      {/* Модалка админ-панели */}
      {showAdmin && (
        <AdminPanel onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
}

function AdminPanel({ onClose }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "new"
  });
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Запретить прокрутку фона
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Загрузка товаров
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Добавление или редактирование товара
  const handleAddOrEdit = async e => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem('token');
    let url, method;
    if (editId) {
      url = form.category === "used"
        ? `http://localhost:3001/api/products/used/${editId}`
        : `http://localhost:3001/api/products/new/${editId}`;
      method = "PUT";
    } else {
      url = form.category === "used"
        ? 'http://localhost:3001/api/products/used'
        : 'http://localhost:3001/api/products/new';
      method = "POST";
    }
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.error) {
      setMessage(data.error);
    } else {
      if (editId) {
        setProducts(p => p.map(prod => prod.id === editId ? data : prod));
        setMessage("Товар изменён");
      } else {
        setProducts(p => [...p, data]);
        setMessage("Товар добавлен");
      }
      setForm({ name: "", price: "", description: "", image: "", category: "new" });
      setEditId(null);
    }
  };

  // Удаление товара
  const handleDelete = async (id, category) => {
    const token = localStorage.getItem('token');
    const url = category === "used"
      ? `http://localhost:3001/api/products/used/${id}`
      : `http://localhost:3001/api/products/new/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if (res.ok) setProducts(p => p.filter(prod => prod.id !== id));
  };

  // Начать редактирование
  const handleEdit = prod => {
    setForm({
      name: prod.name,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      category: prod.category || "new"
    });
    setEditId(prod.id);
  };

  // Пагинация
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const visibleProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="admin-title">Админ-панель</h2>
        <form className="admin-form" onSubmit={handleAddOrEdit}>
          <input
            placeholder="Название"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            placeholder="Цена"
            type="number"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            required
          />
          <input
            placeholder="Описание"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
          <input
            placeholder="Ссылка на фото"
            value={form.image}
            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
          />
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
          <button type="submit">{editId ? "Сохранить" : "Добавить"}</button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ name: "", price: "", description: "", image: "", category: "new" }); }}>
              Отмена
            </button>
          )}
        </form>
        <div className="admin-message">{message}</div>
        <h3 className="admin-list-title">Список товаров</h3>
        <div className="admin-products-list">
          {visibleProducts.map(prod => (
            <div className="admin-product-card" key={prod.id}>
              <img src={prod.image} alt={prod.name} className="admin-product-img" />
              <div className="admin-product-info">
                <b>{prod.name}</b>
                <span>₴{prod.price}</span>
                <span>{prod.category === "used" ? "Used" : "New"}</span>
                <div className="admin-product-actions">
                  <button onClick={() => handleEdit(prod)}>Изменить</button>
                  <button onClick={() => handleDelete(prod.id, prod.category)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="admin-pagination">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Назад</button>
          <span>{page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Вперёд</button>
        </div>
        <button className="admin-close-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default Account;