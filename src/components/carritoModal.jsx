import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider.jsx';

const CarritoModal = ({ isOpen, onClose }) => {
  const { carrito, total, vaciarCarrito } = useContext(DataContext);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <ul>
              {carrito.map((item) => (
                <li key={item.id}>
                  {item.nombre} - {item.cantidad} x ${item.precio}
                </li>
              ))}
            </ul>
            <p>Total: ${total}</p>
            <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          </>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CarritoModal;