import React, { useState } from 'react';
import navBarIcon from '../images/navBarIcon.png';
import '../theme/CSS/navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/"><img src={navBarIcon} height={45}/></a>
          </div>

          <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <a href="/projectilemotion">Projectile</a>
            <a href="/simpleharmonicmotion">Simple Harmonic</a>
            <a href="/waveequation">Wave</a>
          </div>

          <div className="navbar-toggle" onClick={toggleMobileMenu}>
            <span>A</span>
            <span>B</span>
            <span>C</span>
          </div>
        </div>
      </nav>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Navbar;
