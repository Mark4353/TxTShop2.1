import React from 'react';
import './App.css';
import Header from './components/Header';
import ProductCard from './components/ProductCard'; 
  import Main from './components/Main'; // Adjust path as needed
  import ProductList from './components/productList';
function App() {
  return (
    <><div className='container'>
      <Header />
      <Main />
      <ProductList />
      
    </div>
    </>
  );
}

export default App;

