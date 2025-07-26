import React, { useState } from 'react';
import product from '../db.json'

function ProductItem({ product }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="productItem">
        <img
          className="productItem-image"
          src={product.image}
          alt={product.name}
        />
        <div className="productItem-info">
          <h3 className="productItem-title">{product.name}</h3>
          <p className="productItem-description">{product.description}</p>
          <span className="productItem-price">₴{product.price}</span>
          <button className="productItem-button" onClick={() => setShowModal(true)}>
            About
          </button>
        </div>
      </li>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <img
              className="modal-image"
              src={product.image}
              alt={product.name}
            />
            <h2>{product.name}</h2>
            <p><b>Бренд:</b> {product.brand}</p>
            {product.type && <p><b>Тип:</b> {product.type}</p>}
            <p><b>Цена:</b> ₴{product.price}</p>
            <p><b>Рейтинг:</b> {product.rating}</p>
            <p><b>Популярность:</b> {product.popularity}</p>
            {product.releaseYear && <p><b>Год выпуска:</b> {product.releaseYear}</p>}
            {product.compatibility && (
              <p><b>Совместимость:</b> {product.compatibility.join(', ')}</p>
            )}
            {product.features && (
              <div>
                <b>Особенности:</b>
                <ul style={{margin: "8px 0"}}>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <button className="modal-add-button">Add to cart</button>
            <button className="modal-close-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItem;