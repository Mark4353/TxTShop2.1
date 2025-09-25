import React, { useState, useEffect } from 'react';

function UsedProduct({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [start, setStart] = useState(0);
  const visibleCount = 4;
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/products/used')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Количество "страниц" для точек
  const totalPages = Math.ceil(products.length / visibleCount);

  // Переключение по точкам
  const handleDotClick = (pageIdx) => {
    setStart(pageIdx * visibleCount);
  };

  const visibleProducts = products.slice(start, start + visibleCount);

  return (
    <div className="popular-products" id="used-products">
      <h2 className="popular-products-title">Used Products</h2>
      <div className="popular-slider-controls">
        <ul className="popular-products-list">
          {visibleProducts.map(product => (
            <li key={product.id} className="popular-product-item">
              <img src={product.image} alt={product.name} className="popular-product-image" />
              <div className="popular-product-info">
                <h3>{product.name}</h3>
                <span>₴{product.price}</span>
              </div>
              <button
                className="productItem-button"
                onClick={() => onAddToCart(product)}
              >
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Точки-пагинация */}
      {products.length > visibleCount && (
        <div className="slider-dots">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot${start / visibleCount === idx ? " active" : ""}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Показать слайд ${idx + 1}`}
            />
          ))}
        </div>
      )}

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

export default UsedProduct;
