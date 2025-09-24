import React, { useState } from 'react';

function Header({ onCartClick, onAccountClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-box">
        <a href="#" className="header-logo-link">
          <img src="./images/logo.png" className="header-logo" alt="logo" />
        </a>
        {/* Бургер-кнопка всегда видна на мобилке */}
        <button
          className={`burger-btn${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Меню"
        >
          <span />
          <span />
          <span />
        </button>
        {/* Обычные кнопки видны только если бургер закрыт */}
        {!menuOpen && (
          <nav className="header-nav">
            <a href="#products" className="header-products">Products</a>
            <a href="#used-products" className="header-by">Used</a>
            <button className="header-cart" onClick={onCartClick}>
              <img src="./images/cart-icon.svg" className="icon" alt="cart" />
            </button>
            <button className="header-account" onClick={onAccountClick}>
              <img src="./images/account-icon.svg" className="icon" alt="account" />
            </button>
          </nav>
        )}
      </div>
      {/* Выпадающее меню только при открытом бургере */}
      {menuOpen && (
        <>
          <div className="burger-backdrop" onClick={() => setMenuOpen(false)} />
          <nav className="header-nav open">
            <a href="#products" className="header-products" onClick={() => setMenuOpen(false)}>Products</a>
            <a href="#used-products" className="header-by" onClick={() => setMenuOpen(false)}>Used</a>
            <button className="header-cart" onClick={() => { setMenuOpen(false); onCartClick(); }}>
              <img src="./images/cart-icon.svg" className="icon" alt="cart" />
            </button>
            <button className="header-account" onClick={() => { setMenuOpen(false); onAccountClick(); }}>
              <img src="./images/account-icon.svg" className="icon" alt="account" />
            </button>
          </nav>
        </>
      )}
    </header>
  );
}

export default Header;

