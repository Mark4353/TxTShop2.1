import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import ProductList from "./components/productList";
import PopularProducts from "./components/PopularProducts";
import PartnerLogo from "./components/PartnerLogo";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Account from "./components/Account";
import Used from "./components/UsedProduct";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ScrollToTopButton from "./components/ScrollToTopButton";

function App() {
  // const products = data.products;
  // const popularProducts = data.populars;

  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    return token && userData ? JSON.parse(userData) : null;
  });

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  // Проверка при нажатии на "Аккаунт"
  const handleAccountClick = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      setShowAccount(true);
    } else {
      setShowLogin(true);
    }
  };

  // После успешного логина
  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
    setShowAccount(true);
  };

  // После выхода
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowAccount(false);
  };

  return (
    <>
      <div className="container">
        <Header
          onCartClick={() => setShowCart(true)}
          onAccountClick={handleAccountClick}
        />
        <Main />
        {/* <PopularProducts
          products={popularProducts}
          onAddToCart={handleAddToCart}
        /> */}
        {/* <PartnerLogo /> */}
        <ProductList onAddToCart={handleAddToCart} />
        <Used />
        <Footer />
        <ScrollToTopButton />
      </div>
      {showCart && (
        <div className="modal-backdrop" onClick={() => setShowCart(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} />
            <button
              className="modal-close-button"
              onClick={() => setShowCart(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
      <Account
        show={showAccount}
        onClose={() => setShowAccount(false)}
        cartItems={cartItems}
        user={user}
        onLogout={handleLogout}
      />
      {showLogin && (
        <LoginForm
          onLogin={handleLogin}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}
      {showRegister && (
        <RegisterForm
          onRegister={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
          onClose={() => setShowRegister(false)}
        />
      )}
    </>
  );
}

export default App;
