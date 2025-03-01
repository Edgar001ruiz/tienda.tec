import { useState, useEffect } from "react";

const Header = ({ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Controla si el carrito se muestra

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onCleanCart = () => {
    if (window.confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  const removeProduct = (id) => {
    if (window.confirm("¿Eliminar este producto del carrito?")) {
      const updatedProducts = allProducts.filter(product => product.id !== id);
      const newTotal = updatedProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);
      setAllProducts(updatedProducts);
      setTotal(newTotal);
      setCountProducts(updatedProducts.length);
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">Mi Tienda</h1>

      <div className="cart-container">
        <button className="cart-button" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒 {countProducts} Productos
        </button>

        {isCartOpen && (
          <div className="cart-dropdown">
            <div className="cart-content">
              {allProducts.length === 0 ? (
                <p className="empty-cart">El carrito está vacío</p>
              ) : (
                allProducts.map((product) => (
                  <div key={product.id} className="cart-item">
                    <img src={product.urlImage} alt={product.nameProduct} className="cart-img" />
                    <div className="cart-info">
                      <p>{product.nameProduct}</p>
                      <p>${product.price} x {product.quantity}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeProduct(product.id)}>❌</button>
                  </div>
                ))
              )}
            </div>
            {allProducts.length > 0 && (
              <div className="cart-footer">
                <p>Total: ${total.toFixed(2)}</p>
                <button className="clean-cart" onClick={onCleanCart}>Vaciar Carrito</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
