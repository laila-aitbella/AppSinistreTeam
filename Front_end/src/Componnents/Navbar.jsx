import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Ajout pour redirection

  const handleLogout = () => {
    logout();
    navigate('/'); // ✅ Redirige vers Accueil après déconnexion
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">AssurClaim</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">À propos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item">
              {user ? (
                <button onClick={handleLogout} className="btn btn-outline-light ms-2">
                  Déconnexion
                </button>
              ) : (
                <Link className="nav-link" to="/signup">Connexion</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
