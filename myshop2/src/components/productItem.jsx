import React, { useState } from 'react';

function ProductItem({ product, onAddToCart }) {
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
            <ul className="modal-details">
              <li><b>brend:</b> {product.brand}</li>
              {product.type && <li><b>type:</b> {product.type}</li>}
              <li><b>price:</b> ₴{product.price}</li>
              <li><b>rating:</b> {product.rating}</li>
              <li><b>popularity:</b> {product.popularity}</li>
            </ul>
            {product.releaseYear && <p><b>releaseYear:</b> {product.releaseYear}</p>}
            {product.compatibility && (
              <p><b>compatibility:</b> {product.compatibility.join(', ')}</p>
            )}
            {product.features && (
              <div>
                <b>features:</b>
                <ul style={{margin: "8px 0"}}>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              className="modal-add-button"
              onClick={() => {
                onAddToCart(product);
                setShowModal(false);
              }}
            >
              Add to cart
            </button>
            <button className="modal-close-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductItem;