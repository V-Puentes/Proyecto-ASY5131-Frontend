import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';

const MagicPage = () => {
  const { productos, carrito, añadirAlCarrito, loading, error } = useContext(DataContext);
  
  const magicProducts = productos.filter(p => p.franquicia === 'magic');

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Productos de Magic</h2>
      
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-warning">
          {error} 
          <button 
            className="btn btn-sm btn-outline-secondary ms-2"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && magicProducts.length === 0 && (
        <div className="alert alert-info">
          No hay productos de Magic disponibles actualmente.
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {magicProducts.map(product => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm">
              <div className="ratio ratio-4x3">
                <img
                  src={product.foto}
                  className="card-img-top p-2"
                  alt={product.nombre}
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.nombre}</h5>
                <p className="card-text flex-grow-1">{product.descripcion}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="text-success fw-bold">
                    ${product.precio.toLocaleString()}
                  </span>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => añadirAlCarrito(product)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicPage;