"use client";

import { useState, useEffect } from "react";

const Header = ({ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts }) => {
  const [isMounted, setIsMounted] = useState(false); // Definir el estado

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

  return (
    <header className="header">
      <h1 className="header-title">Tienda Ruiz</h1>
      <div className="cart-info">
        <p>Total: ${total}</p>
        <p>Productos en el carrito: {countProducts}</p>
        <button className="clean-cart" onClick={onCleanCart}>Vaciar Carrito</button>
      </div>
    </header>
  );
};

export default Header;
