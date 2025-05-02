import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Estado para los productos
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el carrito (con persistencia en localStorage)
  const [carrito, setCarrito] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Efecto para cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://pocketcenter-backend.vercel.app/api/productos');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Normaliza las URLs de las imágenes
        const productosNormalizados = data.map(producto => ({
          ...producto,
          foto: normalizeImageUrl(producto.foto)
        }));
        
        setProductos(productosNormalizados);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Función para normalizar URLs de imágenes
  const normalizeImageUrl = (imgUrl) => {
    if (!imgUrl) return '/placeholder.jpg';
    
    // Si ya es una URL válida
    if (imgUrl.startsWith('http')) return imgUrl;
    
    // Si es base64
    if (/^[A-Za-z0-9+/]+={0,2}$/.test(imgUrl)) {
      return `data:image/jpeg;base64,${imgUrl}`;
    }
    
    // Si es una ruta relativa de GitHub
    if (imgUrl.includes('github.com') || imgUrl.includes('raw.githubusercontent.com')) {
      return imgUrl.startsWith('http') ? imgUrl : `https://${imgUrl}`;
    }
    
    return '/placeholder.jpg';
  };

  // Calcula el total del carrito
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // Añadir producto al carrito
  const añadirAlCarrito = (producto) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === producto.id);
      const nuevoCarrito = existente
        ? prev.map(item =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...prev, { ...producto, cantidad: 1 }];
      
      localStorage.setItem('cart', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  // Eliminar producto del carrito
  const eliminarProducto = (id) => {
    setCarrito(prev => {
      const nuevoCarrito = prev
        .map(item => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter(item => item.cantidad > 0);
      
      localStorage.setItem('cart', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  // Vaciar completamente el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('cart');
  };

  // Persistencia del carrito
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(carrito));
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  }, [carrito]);

  return (
    <DataContext.Provider value={{
      productos,
      carrito,
      loading,
      error,
      total,
      añadirAlCarrito,
      eliminarProducto,
      vaciarCarrito,
      setProductos
    }}>
      {children}
    </DataContext.Provider>
  );
};