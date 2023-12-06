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
          <a href="/">Physics Plot</a>
        </div>

        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="/projectilemotion">Projectile</a>
          <a href="/simpleharmonicmotion">Simple Harmonic</a>
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
