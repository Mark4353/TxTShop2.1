import React, { useEffect, useState } from "react";
import ProductItem from "./productItem";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 600 ? 10 : window.innerWidth < 900 ? 16 : 20
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products/new");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(
        window.innerWidth < 600 ? 10 : window.innerWidth < 900 ? 16 : 20
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  return (
    <div className="product-list" id="products">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-ul">
        {products.slice(0, visibleCount).map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </ul>
      {visibleCount < products.length && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load more
        </button>
      )}
    </div>
  );
}

export default ProductList;

