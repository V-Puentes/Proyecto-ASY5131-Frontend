import { useEffect, useState } from 'react';
import './Productos.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // 1. Hacer la petición y obtener el texto HTML completo
        const response = await fetch('https://pocketcenter-backend.vercel.app/api/productos');
        const htmlText = await response.text();
        
        // 2. Debug: Mostrar parte del HTML recibido
        console.log("HTML recibido (primeros 300 caracteres):", htmlText.substring(0, 300));

        // 3. Extraer el JSON del HTML
        const jsonStart = htmlText.indexOf('[{');
        const jsonEnd = htmlText.lastIndexOf('}]') + 2;
        
        if (jsonStart === -1 || jsonEnd === -1) {
          throw new Error("No se encontró un JSON válido dentro del HTML");
        }

        const jsonString = htmlText.slice(jsonStart, jsonEnd);
        console.log("JSON extraído:", jsonString);

        // 4. Parsear el JSON
        const data = JSON.parse(jsonString);
        
        // 5. Formatear los productos
        const productosFormateados = data.map(item => ({
          id: item.id,
          nombre: item.nombre || 'Sin nombre',
          descripcion: item.descripcion || '',
          precio: item.precio || 0,
          foto: item.foto ? item.foto.replace('data:image/jpeg;base64,', '') : null,
          franquicia: item.franquicia || null,
          oferta: item.oferta || false
        }));

        setProductos(productosFormateados);

      } catch (error) {
        console.error("Error completo:", {
          message: error.message,
          stack: error.stack
        });
        setError(`Error al procesar los datos: ${error.message}`);
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
        <h3>Error al cargar los productos</h3>
        <p className="error-message">{error}</p>
        <div className="debug-tips">
          <p>Para solucionar:</p>
          <ol>
            <li>Verifica que el backend esté disponible</li>
            <li>
              <a 
                href="https://pocketcenter-backend.vercel.app/api/productos" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Abre el endpoint directamente
              </a> y comparte lo que ves
            </li>
            <li>Revisa la consola (F12) para más detalles</li>
          </ol>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-button"
        >
          Volver a intentar
        </button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="empty-state">
        <p>No se encontraron productos</p>
        <small>La base de datos puede estar vacía</small>
      </div>
    );
  }

  return (
    <div className="productos-container">
      <h2 className="catalog-title">Catálogo de Productos</h2>
      
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <div className="image-container">
              {producto.foto ? (
                <img
                  src={producto.foto}
                  alt={producto.nombre}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200?text=Imagen+no+disponible';
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  <span>Sin imagen</span>
                </div>
              )}
            </div>
            
            <div className="product-info">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p className="price">${producto.precio.toLocaleString()}</p>
              
              {producto.franquicia && (
                <p className="franchise">Franquicia: {producto.franquicia}</p>
              )}
              
              {producto.oferta && (
                <span className="offer-tag">🔥 Oferta</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;