import React from "react";
import "./App.css";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Main from "./components/Main";
import ProductList from "./components/productList";
import PopularProducts from "./components/PopularProducts";
import data from "./db.json"; 

function App() {
  const products = data.products;
  const popularProducts = data.populars;

  return (
    <>
      <div className="container">
        <Header />
        <Main />
        <PopularProducts products={popularProducts} />
        <ProductList />
      </div>
    </>
  );
}

export default App;
