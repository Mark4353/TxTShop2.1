import React, { useEffect, useState } from "react";
import ProductItem from "./productItem";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(
    window.innerWidth < 600 ? 10 : window.innerWidth < 900 ? 16 : 20
  );
  const [brandFilter, setBrandFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sort, setSort] = useState("none"); // Новое состояние сортировки

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

  // Получаем уникальные бренды и типы для фильтров
  const brands = [
    "all",
    ...Array.from(new Set(products.map((p) => p.brand).filter(Boolean))),
  ];
  const types = [
    "all",
    ...Array.from(new Set(products.map((p) => p.type).filter(Boolean))),
  ];

  // Фильтрация товаров
  let filteredProducts = products.filter((product) => {
    const brandOk = brandFilter === "all" || product.brand === brandFilter;
    const typeOk = typeFilter === "all" || product.type === typeFilter;
    return brandOk && typeOk;
  });

  // Сортировка по цене
  if (sort === "asc") {
    filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
  }

  return (
    <div className="product-list" id="products">
      <h2 className="product-list-title">Products</h2>
      <div className="product-filters">
        <select
          className="product-filter-select"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand === "all" ? "Все бренды" : brand}
            </option>
          ))}
        </select>
        <select
          className="product-filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "Все типы" : type}
            </option>
          ))}
        </select>
        <select
          className="product-filter-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="none">Без сортировки</option>
          <option value="asc">Цена: по возрастанию</option>
          <option value="desc">Цена: по убыванию</option>
        </select>
      </div>
      <ul className="product-list-ul">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </ul>
      {visibleCount < filteredProducts.length && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load more
        </button>
      )}
    </div>
  );
}

export default ProductList;

