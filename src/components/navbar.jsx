import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-indigo-900 fixed-top w-100 shadow-lg">
      <div className="container-fluid">
        {/* Logo y título */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img 
            src="/api/placeholder/40/40" 
            alt="TCG Store Logo" 
            className="h-10 w-10 mr-2" 
          />
          <span className="text-white font-bold text-xl">TCG Universe</span>
        </Link>

        {/* Botón de menú para móviles */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen ? 'true' : 'false'} 
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú de navegación */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-black">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/pokemon" className="nav-link text-black">Pokémon</Link>
            </li>
            <li className="nav-item">
              <Link to="/yugioh" className="nav-link text-black">Yu-Gi-Oh!</Link>
            </li>
            <li className="nav-item">
              <Link to="/magic" className="nav-link text-black">Magic</Link>
            </li>
            <li className="nav-item">
              <Link to="/ofertas" className="nav-link text-black">Ofertas</Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link text-black">Contacto</Link>
            </li>
          </ul>

          {/* Iconos de acción en escritorio */}
          <div className="d-flex align-items-center ms-4">
            <button className="btn text-black me-3">
              <Search size={20} />
            </button>
            <Link to="/carrito" className="btn text-black position-relative me-3">
              <ShoppingCart size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-teal-500 text-white">
                3
              </span>
            </Link>
            <Link to="/cuenta" className="btn text-black">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
