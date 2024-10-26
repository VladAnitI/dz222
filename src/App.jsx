import { useState } from 'react';
import './App.css'; 

function App() {
  const products = [
    { id: 1, name: 'Товар 1', price: 30, discount: false, count: 0 },
    { id: 2, name: 'Товар 2', price: 30, discount: false, count: 0 },
    { id: 3, name: 'Товар 3', price: 30, discount: false, count: 0 },
    { id: 4, name: 'Товар 4', price: 15, discount: true, oldPrice: 30, count: 0 },
    { id: 5, name: 'Товар 5', price: 15, discount: true, oldPrice: 30, count: 0 },
  ];

  const [productList, setProductList] = useState(products);
  const [cartCount, setCartCount] = useState(0);
  const [filterType, setFilterType] = useState('all');

  const increaseCount = (id) => {
    const updatedProducts = productList.map((product) => {
      if (product.id === id) {
        product.count += 1;
        setCartCount(cartCount + 1);
      }
      return product;
    });
    setProductList(updatedProducts);
  };

  const decreaseCount = (id) => {
    const updatedProducts = productList.map((product) => {
      if (product.id === id && product.count > 0) {
        product.count -= 1;
        setCartCount(cartCount - 1);
      }
      return product;
    });
    setProductList(updatedProducts);
  };

  const filteredProducts = productList.filter((product) => {
    if (filterType === 'discount') {
      return product.discount;
    } else if (filterType === 'cart') {
      return product.count > 0;
    } else {
      return true; 
    }
  });

  return (
    <div>
      <div className="navbar">
        <button onClick={() => setFilterType('all')}>Все Товары</button>
        <button onClick={() => setFilterType('discount')}>Скидки</button>
        <button onClick={() => setFilterType('cart')}>Корзина {cartCount}</button>
      </div>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`product-card ${product.discount ? 'discount' : ''}`}
          >
            <h3>{product.name}</h3>
            <p>Описание Товара</p>
            <p>
              Цена: {product.price}$
              {product.discount && (
                <span className="old-price">{product.oldPrice}$</span>
              )}
            </p>
            <div className="counter-buttons">
              <button onClick={() => decreaseCount(product.id)}>-</button>
              <input type="text" value={product.count} readOnly />
              <button onClick={() => increaseCount(product.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;