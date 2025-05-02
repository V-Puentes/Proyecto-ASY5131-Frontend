
import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';

const MagicPage = () => {
  const { productos, carrito, setCarrito, loading, error } = useContext(DataContext);

  const añadirAlCarrito = (producto) => {
    const existente = carrito.find(item => item.id === producto.id);
    setCarrito(existente 
      ? carrito.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        )
      : [...carrito, { ...producto, cantidad: 1 }]
    );
  };

  const magicProducts = productos.filter(p => p.franquicia === 'magic');

  if (loading) return <div className="text-center py-5">Cargando...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Productos de Magic</h2>
      {magicProducts.length === 0 ? (
        <div className="alert alert-info">No hay productos disponibles</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {magicProducts.map(product => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.foto || '/placeholder.jpg'}
                  className="card-img-top p-2"
                  alt={product.nombre}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.nombre}</h5>
                  <p className="card-text flex-grow-1">{product.descripcion}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-success fw-bold">
                      ${product.precio.toLocaleString()}
                    </span>
                    {product.oferta && (
                      <span className="badge bg-danger">Oferta</span>
                    )}
                  </div>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => añadirAlCarrito(product)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MagicPage;