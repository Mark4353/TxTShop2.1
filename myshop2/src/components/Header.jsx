function Header() {
  return (
    <header className="header">
        <a href="#" className="header-logo-link">
      <img src className="header-logo" alt="logo" />
   </a>  
    <button className="header-search bs"><use><svg className="search-icon icon" src /></use></button>
      <button className="header-products">Products</button>
      <button className="header-by header-products">Б/у</button>
        <button className="header-cart bs"><use><svg className="cart-icon icon" src /></use></button>
        <button className="header-account bs"><use><svg className="account-icon icon" src /></use></button>
    </header>
  );
}
export default Header;
