function Header({ onCartClick, onAccountClick }) {
  return (
    <header className="header">
      <a href="#" className="header-logo-link">
        <img src="./images/logo.png" className="header-logo" alt="logo" />
      </a>
      <button className="header-search bs">
        <img src="./images/search-icon.svg" className="search-icon icon" alt="search" />
      </button>
      <button className="header-products">Products</button>
      <button className="header-by header-products">Б/у</button>
      <button className="header-cart bs" onClick={onCartClick}>
        <img src="./images/cart-icon.svg" className="cart-icon icon" alt="cart" />
      </button>
      <button className="header-account bs" onClick={onAccountClick}>
        <img src="./images/account-icon.svg" className="account-icon icon" alt="account" />
      </button>
    </header>
  );
}
export default Header;

