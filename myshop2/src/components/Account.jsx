import React, { useState, useEffect } from "react";

function Account({ show, onClose, cartItems }) {
  const [registered, setRegistered] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [activeTab, setActiveTab] = useState("profile");
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  // Загружаем пользователя из localStorage при открытии модалки
  useEffect(() => {
    if (show) {
      const savedUser = localStorage.getItem("accountUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
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
      setUser({ name: form.name, email: form.email });
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
        {!registered ? (
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
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Account;