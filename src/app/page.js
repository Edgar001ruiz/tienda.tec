"use client";

import { useState, useEffect } from "react";


import Header from "./componentes/Header";
import { ProductList } from "./componentes/ProductList";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  useEffect(() => {
    console.log("Página cargada correctamente");
  }, []);

  return (
    <div>
      <Header 
        allProducts={allProducts} 
        setAllProducts={setAllProducts} 
        total={total} 
        setTotal={setTotal} 
        countProducts={countProducts} 
        setCountProducts={setCountProducts} 
      />
      <ProductList 
        allProducts={allProducts} 
        setAllProducts={setAllProducts} 
        countProducts={countProducts} 
        setCountProducts={setCountProducts} 
        total={total} 
        setTotal={setTotal} 
      />
    </div>
  );
}
