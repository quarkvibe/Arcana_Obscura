import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Sparkles className="logo-icon" />
          <span>Arcana Obscura</span>
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </div>
        
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/reading-room" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Reading Room
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/encyclopedia" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Encyclopedia
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Reading History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;