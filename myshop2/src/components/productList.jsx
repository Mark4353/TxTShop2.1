import ProductItem from './productItem'; 
import data from '../db.json'; 
function ProductList() {
  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="productList">
        {data.products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>

    </div>
  );
}

export default ProductList;



