import React, { useState } from 'react';
import data from '../db.json'; 
const products = data.populars;

function PopularProducts() {
  const [start, setStart] = useState(0);
  const visibleCount = 3;
  const [modalProduct, setModalProduct] = useState(null);

  const handlePrev = () => {
    setStart(prev => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setStart(prev => Math.min(prev + visibleCount, products.length - visibleCount));
  };

  const visibleProducts = products.slice(start, start + visibleCount);

  return (
    <div className="popular-products">
      <h2 className="popular-products-title">Popular Products</h2>
      <div className="popular-slider-controls">
        <button onClick={handlePrev} disabled={start === 0} className="slider-arrow">{'<'}</button>
        <ul className="popular-products-list">
          {visibleProducts.map(product => (
            <li key={product.id} className="popular-product-item">
              <img src={product.image} alt={product.name} className="popular-product-image" />
              <div className="popular-product-info">
                <h3>{product.name}</h3>
                <span>₴{product.price}</span>
                <span>⭐ {product.rating}</span>
              </div>
              <button
                className="productItem-button popularItem-button"
                onClick={() => setModalProduct(product)}
              >
                About
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleNext} disabled={start + visibleCount >= products.length} className="slider-arrow">{'>'}</button>
      </div>

      {modalProduct && (
        <div className="modal-backdrop" onClick={() => setModalProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img
              className="modal-image"
              src={modalProduct.image}
              alt={modalProduct.name}
            />
            <h2>{modalProduct.name}</h2>
            <ul className="modal-details">
              <li><b>brand:</b> {modalProduct.brand}</li>
              {modalProduct.type && <li><b>type:</b> {modalProduct.type}</li>}
              <li><b>price:</b> ₴{modalProduct.price}</li>
              <li><b>rating:</b> {modalProduct.rating}</li>
              <li><b>popularity:</b> {modalProduct.popularity}</li>
            </ul>
            {modalProduct.releaseYear && <p><b>releaseYear:</b> {modalProduct.releaseYear}</p>}
            {modalProduct.compatibility && (
              <p><b>compatibility:</b> {modalProduct.compatibility.join(', ')}</p>
            )}
            {modalProduct.features && (
              <div>
                <b>features:</b>
                <ul style={{margin: "8px 0"}}>
                  {modalProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <button className="modal-add-button">Add to cart</button>
            <button className="modal-close-button" onClick={() => setModalProduct(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopularProducts;
