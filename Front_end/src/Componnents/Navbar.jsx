import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 🎨 Styles professionnels
const styles = {
  navbar: {
    backgroundColor: '#6c3ef4', // 🎨 couleur du bouton violet
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '12px 0',
  },
  brand: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
  },
  link: {
    color: '#ffffff',
    marginLeft: '16px',
    fontWeight: '500',
    textDecoration: 'none',
  },
  linkHover: {
    color: '#dcdcdc',
  },
  button: {
    borderColor: '#ffffff',
    color: '#ffffff',
    marginLeft: '16px',
    padding: '6px 12px',
    borderRadius: '6px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    transition: 'background-color 0.3s, color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#ffffff',
    color: '#6c3ef4',
    borderColor: '#ffffff',
  },
};


  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={styles.navbar}>
      <div className="container">
        <Link className="navbar-brand" to="/" style={styles.brand}>AssurClaim</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={styles.link}>Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={styles.link}>À propos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={styles.link}>Contact</Link>
            </li>
            <li className="nav-item">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn"
                  style={styles.button}
                  onMouseOver={e => Object.assign(e.target.style, styles.buttonHover)}
                  onMouseOut={e => Object.assign(e.target.style, styles.button)}
                >
                  Déconnexion
                </button>
              ) : (
                <Link className="nav-link" to="/signup" style={styles.link}>Connexion</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
