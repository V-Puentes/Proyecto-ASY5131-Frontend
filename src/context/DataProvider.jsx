import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

// Datos de ejemplo integrados
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    nombre: "Mazo Inicial Magic",
    franquicia: "magic",
    precio: 19990,
    foto: "/assets/jpg/1-Sobre de Cartas Pokémon Scarlet y Violet.jpg",
    descripcion: "Mazo introductorio para nuevos jugadores"
  },
  {
    id: 2,
    nombre: "Expansión Throne of Eldraine",
    franquicia: "magic",
    precio: 24990,
    foto: "/assets/jpg/1-Sobre de Cartas Pokémon Scarlet y Violet.jpg",
    descripcion: "Nueva expansión de Magic"
  }
];

export const DataProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Intenta cargar desde el backend principal
        let response = await fetch('https://pocketcenter-backend.vercel.app/api/productos');
        
        // 2. Si falla, intenta con el endpoint alternativo
        if (!response.ok) {
          response = await fetch('https://api.npoint.io/...'); // Reemplaza con tu endpoint alternativo
        }
        
        // 3. Si sigue fallando, intenta con el JSON local
        if (!response.ok) {
          response = await fetch('/productos.json');
        }
        
        // 4. Si todo falla, usa los datos por defecto
        if (!response.ok) throw new Error('No se pudo cargar ningún recurso');
        
        const data = await response.json();
        const productosData = data.productos || data || DEFAULT_PRODUCTS;
        
        setProductos(normalizeProducts(productosData));
        
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("No se pudieron cargar los productos. Mostrando datos de ejemplo.");
        setProductos(normalizeProducts(DEFAULT_PRODUCTS));
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const normalizeProducts = (products) => {
    return products.map(p => ({
      ...p,
      foto: normalizeImageUrl(p.foto),
      precio: Number(p.precio) || 0,
      franquicia: p.franquicia?.toLowerCase() || 'otros'
    }));
  };

  const normalizeImageUrl = (imgUrl) => {
    if (!imgUrl) return '/assets/vite.svg';
    if (imgUrl.startsWith('http')) return imgUrl;
    if (imgUrl.startsWith('/')) return imgUrl;
    return `/images/${imgUrl}`;
  };

  // Resto de las funciones del carrito...
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

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

  return (
    <DataContext.Provider value={{
      productos,
      carrito,
      loading,
      error,
      total,
      añadirAlCarrito,
      eliminarProducto: (id) => {
        setCarrito(prev => {
          const nuevoCarrito = prev
            .map(item => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
            .filter(item => item.cantidad > 0);
          localStorage.setItem('cart', JSON.stringify(nuevoCarrito));
          return nuevoCarrito;
        });
      },
      vaciarCarrito: () => {
        setCarrito([]);
        localStorage.removeItem('cart');
      }
    }}>
      {children}
    </DataContext.Provider>
  );
};