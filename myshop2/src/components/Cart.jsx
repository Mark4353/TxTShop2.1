import React, { useState } from "react";

function Cart({ cartItems, onRemove }) {
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(cartItems.length / itemsPerPage);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const startIdx = (page - 1) * itemsPerPage;
  const visibleItems = cartItems.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul>
            {visibleItems.map((item, idx) => (
              <li key={startIdx + idx}>
                {item.name} — ₴{item.price}
                <button onClick={() => onRemove(startIdx + idx)}>Удалить</button>
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
          <button
            className="cart-pay-button"
            onClick={() => alert("Оплата не реализована")}
          >
            Оплатить
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;