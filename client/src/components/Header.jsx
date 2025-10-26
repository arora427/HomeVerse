import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 400) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  const closeNav = () => {
    setIsNavActive(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeNav();
  };

  return (
    <>
      <header className={`header ${isHeaderActive ? 'active' : ''}`} data-header>
        <div className={`overlay ${isNavActive ? 'active' : ''}`} data-overlay onClick={toggleNav}></div>

        <div className="header-top">
          <div className="container">
            <ul className="header-top-list">
              <li>
                <a href="mailto:info@homeverse.in" className="header-top-link">
                  <ion-icon name="mail-outline"></ion-icon>
                  <span>info@homeverse.in</span>
                </a>
              </li>
              <li>
                <a href="#" className="header-top-link">
                  <ion-icon name="location-outline"></ion-icon>
                  <address>Mumbai, Maharashtra, India</address>
                </a>
              </li>
            </ul>

            <div className="wrapper">
              <ul className="header-top-social-list">
                <li>
                  <a href="#" className="header-top-social-link">
                    <ion-icon name="logo-facebook"></ion-icon>
                  </a>
                </li>
                <li>
                  <a href="#" className="header-top-social-link">
                    <ion-icon name="logo-twitter"></ion-icon>
                  </a>
                </li>
                <li>
                  <a href="#" className="header-top-social-link">
                    <ion-icon name="logo-instagram"></ion-icon>
                  </a>
                </li>
              </ul>

              {isAuthenticated ? (
                <Link to="/add-property" className="header-top-btn">Add Listing</Link>
              ) : (
                <button className="header-top-btn" onClick={() => setIsAuthModalOpen(true)}>
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <Link to="/" className="logo">
              <img src="/assets/images/logo.png" alt="Homeverse logo" />
            </Link>

            <nav className={`navbar ${isNavActive ? 'active' : ''}`} data-navbar>
              <div className="navbar-top">
                <Link to="/" className="logo">
                  <img src="/assets/images/logo.png" alt="Homeverse logo" />
                </Link>

                <button className="nav-close-btn" onClick={toggleNav}>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>

              <div className="navbar-bottom">
                <ul className="navbar-list">
                  <li>
                    <Link to="/" className="navbar-link" onClick={closeNav}>Home</Link>
                  </li>
                  {isAuthenticated && (
                    <>
                      <li>
                        <Link to="/my-properties" className="navbar-link" onClick={closeNav}>
                          My Properties
                        </Link>
                      </li>
                      <li>
                        <Link to="/add-property" className="navbar-link" onClick={closeNav}>
                          Add Property
                        </Link>
                      </li>
                    </>
                  )}
                  {isAuthenticated ? (
                    <li>
                      <button className="navbar-link" onClick={handleLogout} style={{border:'none', background:'none'}}>
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button className="navbar-link" onClick={() => {setIsAuthModalOpen(true); closeNav();}} style={{border:'none', background:'none'}}>
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </nav>

            <div className="header-bottom-actions">
              {isAuthenticated && (
                <div className="header-bottom-actions-btn" style={{cursor:'pointer'}}>
                  <ion-icon name="person-outline"></ion-icon>
                  <span>{user?.name}</span>
                </div>
              )}

              <button className="header-bottom-actions-btn" onClick={toggleNav}>
                <ion-icon name="menu-outline"></ion-icon>
                <span>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;