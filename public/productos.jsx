import { useEffect, useState } from 'react';
import './Productos.css'; // Asegúrate de tener este archivo para los estilos

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://pocketcenter-backend.vercel.app/api/productos');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>⚠️ Error al cargar los productos</p>
        <p className="error-detail">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="productos-container">
      <h2 className="catalogo-title">Catálogo de Productos</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            {/* Mostrar imagen si existe */}
            {producto.foto && (
              <img 
                src={producto.foto} 
                alt={producto.nombre} 
                className="producto-imagen"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/200'; // Imagen de respaldo
                }}
              />
            )}
            
            <div className="producto-info">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
              <p className="producto-precio">${producto.precio.toLocaleString()}</p>
              
              {/* Mostrar franquicia si existe */}
              {producto.franquicia && (
                <p className="producto-franquicia">
                  Franquicia: {producto.franquicia}
                </p>
              )}
              
              {/* Mostrar oferta si existe */}
              {producto.oferta && (
                <span className="producto-oferta">🔥 En oferta</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;