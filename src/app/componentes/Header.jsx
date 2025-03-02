"use client";
import { useState } from "react";
import Image from "next/image";

const Header = ({ allProducts, setAllProducts, total, setTotal, countProducts, setCountProducts }) => {
  const [active, setActive] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const onDeleteProduct = (product) => {
    if (window.confirm(`¿Estás seguro de eliminar "${product.nameProduct}" del carrito?`)) {
      const results = allProducts.filter(item => item.id !== product.id);
      setAllProducts(results);
      setTotal(total - (product.price * product.quantity));
      setCountProducts(countProducts - product.quantity);
    }
  };

  const onCleanCart = () => {
    if (allProducts.length > 0 && window.confirm("¿Estás seguro de vaciar todo el carrito?")) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  return (
    <header>
      <h1>Tienda de Tecnología Ruiz</h1>

      {typeof window !== "undefined" && (
        <div className="cart-icon" onClick={() => setActive(!active)}>
          🛒 <span className="cart-count">{countProducts}</span>
          </div>
        )}

      {/* MENÚ DESPLEGABLE DEL CARRITO */}
      <div className={`cart-dropdown ${active ? "active" : ""}`}>
        <h2>Carrito de Compras</h2>

        {allProducts.length === 0 ? (
          <p className="empty-cart">El carrito está vacío</p>
        ) : (
          <>
            {allProducts.map((product) => (
              <div className="cart-item" key={product.id}>
                <Image src={product.urlImage} alt={product.nameProduct} width={50} height={50} />
                <div className="cart-details">
                  <p>{product.nameProduct}</p>
                  <p>{product.quantity} x ${product.price}</p>
                </div>
                <button className="delete-btn" onClick={() => onDeleteProduct(product)}>🗑</button>
              </div>
            ))}

            {/* Botones de Vaciar Carrito y Generar Factura */}
            <div className="cart-footer">
              <button className="clean-cart" onClick={onCleanCart}>Vaciar Carrito</button>
              <button className="invoice-btn" onClick={() => setShowInvoice(true)}>Generar Factura</button>
            </div>
          </>
        )}
      </div>

      {/* MODAL DE FACTURA */}
      {showInvoice && (
        <div className="modal">
          <div className="modal-content">
            <h2>Factura</h2>
            <ul>
              {allProducts.map((product, index) => (
                <li key={index}>
                  {product.nameProduct} - ${product.price} x {product.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ${total}</p>
            <button className="close-btn" onClick={() => setShowInvoice(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
