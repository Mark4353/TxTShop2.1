import ProductItem from './productItem'; 
import data from '../db.json'; 
function ProductList({ onAddToCart }) {
  return (
    <div className="product-list" id='products'>
      <h2 className="product-list-title">Products</h2>
      <ul className="productList">
        {data.products.map(product => (
          <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </ul>

    </div>
  );
}

export default ProductList;



