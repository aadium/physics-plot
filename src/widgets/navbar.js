import React, { useState } from 'react';
import '../theme/CSS/navbar.css'

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">Graphed Equations</a>
        </div>

        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="/projectilemotion">Projectile Motion</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>

        <div className="navbar-toggle" onClick={toggleMobileMenu}>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
