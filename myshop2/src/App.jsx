import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import ProductList from "./components/productList";
import PopularProducts from "./components/PopularProducts";
import data from "./db.json";
import PartnerLogo from "./components/PartnerLogo";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Account from "./components/Account";
import Used from "./components/UsedProduct";  

function App() {
  const products = data.products;
  const popularProducts = data.populars;

  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      <div className="container">
        <Header onCartClick={() => setShowCart(true)} onAccountClick={() => setShowAccount(true)} />
        <Main />
        <PopularProducts products={popularProducts} onAddToCart={handleAddToCart} />
         <PartnerLogo />
         <ProductList onAddToCart={handleAddToCart} />
        <Used />
        <Footer />
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
      <Account show={showAccount} onClose={() => setShowAccount(false)} cartItems={cartItems} />
    </>
  );
}

export default App;
