import { useEffect, useState } from 'react';

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://pocketcenter-backend.vercel.app/api/productos')
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <div className="grid">
        {productos.map((producto) => (
          <div key={producto.id} className="card">
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            {producto.oferta && <span>🔥 En oferta</span>}
            <p>Franquicia: {producto.franquicia}</p>
            {/* Aquí podrías poner imagen si las sirves por URL */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
