import React from 'react';
import { useCarrito } from './ShoppingCartContext';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  return (
    <div className="carrito-container p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300">
            {carrito.map((producto) => (
              <li key={producto.id} className="flex justify-between items-center py-2">
                <div>
                  <h4 className="font-semibold">{producto.nombre}</h4>
                  <p className="text-gray-600">Cantidad: {producto.cantidad}</p>
                  <p className="text-gray-600">Precio: ${producto.precio}</p>
                </div>
                <button 
                  onClick={() => eliminarDelCarrito(producto.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={vaciarCarrito} 
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded w-full"
          >
            Vaciar Carrito
          </button>
        </>
      )}
    </div>
  );
};

export default Carrito;
