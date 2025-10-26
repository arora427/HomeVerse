# Frontend Implementation Guide

This file contains all the remaining React components you need to create. Copy each section into the specified file path.

## Table of Contents
1. [Update public/index.html](#1-update-publicindexhtml)
2. [Header Component](#2-header-component)
3. [Footer Component](#3-footer-component)
4. [Hero Component](#4-hero-component)
5. [PropertyCard Component](#5-propertycard-component)
6. [PropertyList Component](#6-propertylist-component)
7. [ContactForm Component](#7-contactform-component)
8. [Home Page](#8-home-page)
9. [PropertyDetails Page](#9-propertydetails-page)
10. [MyProperties Page](#10-myproperties-page)
11. [AddProperty Page](#11-addproperty-page)
12. [EditProperty Page](#12-editproperty-page)
13. [App.js](#13-appjs)
14. [index.js](#14-indexjs)
15. [index.css](#15-indexcss)

---

## 1. Update public/index.html

**Path:** `client/public/index.html`

Replace the content with:

```html
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Homeverse - Find your dream property in India" />
  
  <title>Homeverse - Indian Real Estate Platform</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Original CSS -->
  <link rel="stylesheet" href="%PUBLIC_URL%/assets/css/style.css">
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  
  <!-- Ionicons -->
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>
</html>
```

---

## 2. Header Component

**Path:** `client/src/components/Header.jsx`

```jsx
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
```

---

## 3. Footer Component

**Path:** `client/src/components/Footer.jsx`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="/" className="logo">
              <img src="/assets/images/logo-light.png" alt="Homeverse logo" />
            </a>

            <p className="section-text">
              India's leading real estate platform. Find your dream property across major cities like Mumbai, Delhi, Bengaluru, and more.
            </p>

            <ul className="contact-list">
              <li>
                <a href="#" className="contact-link">
                  <ion-icon name="location-outline"></ion-icon>
                  <address>Mumbai, Maharashtra, India</address>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="contact-link">
                  <ion-icon name="call-outline"></ion-icon>
                  <span>+91-9876543210</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@homeverse.in" className="contact-link">
                  <ion-icon name="mail-outline"></ion-icon>
                  <span>contact@homeverse.in</span>
                </a>
              </li>
            </ul>

            <ul className="social-list">
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <ion-icon name="logo-youtube"></ion-icon>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-link-box">
            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Company</p>
              </li>
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <a href="#" className="footer-link">About</a>
              </li>
              <li>
                <a href="#" className="footer-link">All Properties</a>
              </li>
              <li>
                <a href="#" className="footer-link">Contact us</a>
              </li>
            </ul>

            <ul className="footer-list">
              <li>
                <p className="footer-list-title">Services</p>
              </li>
              <li>
                <a href="#" className="footer-link">Buy Property</a>
              </li>
              <li>
                <a href="#" className="footer-link">Rent Property</a>
              </li>
              <li>
                <a href="#" className="footer-link">Sell Property</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2025 Homeverse. All Rights Reserved | Built for Indian Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

---

## 4. Hero Component

**Path:** `client/src/components/Hero.jsx`

```jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">
            <ion-icon name="home"></ion-icon>
            <span>Indian Real Estate Platform</span>
          </p>

          <h2 className="h1 hero-title">Find Your Dream Property In India</h2>

          <p className="hero-text">
            Discover the perfect home across major Indian cities. From Mumbai to Bengaluru, 
            find properties that match your lifestyle and budget.
          </p>

          <a href="#property" className="btn">Explore Properties</a>
        </div>

        <figure className="hero-banner">
          <img src="/assets/images/hero-banner.png" alt="Modern house model" className="w-100" />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
```

---

## 5. PropertyCard Component

**Path:** `client/src/components/PropertyCard.jsx`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format';

const PropertyCard = ({ property }) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/property-1.jpg';
    if (imagePath.startsWith('/uploads')) {
      return `${API_URL}${imagePath}`;
    }
    return imagePath;
  };

  const priceText = property.propertyType === 'rent' 
    ? `${formatINR(property.price)}/Month` 
    : formatINR(property.price);

  return (
    <li>
      <div className="property-card">
        <figure className="card-banner">
          <Link to={`/property/${property._id}`}>
            <img 
              src={getImageUrl(property.images[0])} 
              alt={property.title} 
              className="w-100" 
            />
          </Link>

          <div className={`card-badge ${property.propertyType === 'rent' ? 'green' : 'orange'}`}>
            {property.propertyType === 'rent' ? 'For Rent' : 'For Sale'}
          </div>

          <div className="banner-actions">
            <button className="banner-actions-btn">
              <ion-icon name="location"></ion-icon>
              <address>{property.location}</address>
            </button>
          </div>
        </figure>

        <div className="card-content">
          <div className="card-price">
            <strong>{priceText}</strong>
          </div>

          <h3 className="h3 card-title">
            <Link to={`/property/${property._id}`}>{property.title}</Link>
          </h3>

          <p className="card-text">
            {property.description.substring(0, 100)}...
          </p>

          <ul className="card-list">
            <li className="card-item">
              <strong>{property.bedrooms}</strong>
              <ion-icon name="bed-outline"></ion-icon>
              <span>Bedrooms</span>
            </li>

            <li className="card-item">
              <strong>{property.bathrooms}</strong>
              <ion-icon name="man-outline"></ion-icon>
              <span>Bathrooms</span>
            </li>

            <li className="card-item">
              <strong>{property.squareFeet}</strong>
              <ion-icon name="square-outline"></ion-icon>
              <span>Square Ft</span>
            </li>
          </ul>
        </div>

        <div className="card-footer">
          <div className="card-author">
            <figure className="author-avatar">
              <img src={property.agent.avatar} alt={property.agent.name} className="w-100" />
            </figure>

            <div>
              <p className="author-name">
                <a href="#">{property.agent.name}</a>
              </p>
              <p className="author-title">Estate Agent</p>
            </div>
          </div>

          <div className="card-footer-actions">
            <button className="card-footer-actions-btn">
              <ion-icon name="heart-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PropertyCard;
```

---

## 6. PropertyList Component

**Path:** `client/src/components/PropertyList.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/api/properties?limit=8');
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="property" id="property">
        <div className="container">
          <p className="section-subtitle">Properties</p>
          <h2 className="h2 section-title">Featured Listings</h2>
          <p>Loading properties...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="property" id="property">
      <div className="container">
        <p className="section-subtitle">Properties</p>
        <h2 className="h2 section-title">Featured Listings</h2>

        <ul className="property-list has-scrollbar">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PropertyList;
```

---

## 7. ContactForm Component

**Path:** `client/src/components/ContactForm.jsx`

```jsx
import React, { useState } from 'react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { isValidEmail, isValidIndianPhone } from '../utils/format';

const ContactForm = ({ propertyId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    if (!isValidIndianPhone(formData.phone)) {
      toast.error('Please enter a valid 10-digit Indian phone number');
      return;
    }

    setLoading(true);

    try {
      await api.post('/api/contact', {
        propertyId,
        ...formData
      });
      
      toast.success('Your inquiry has been submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Failed to submit inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-section" style={{marginTop:'40px', padding:'30px', background:'var(--cultured-2)', borderRadius:'8px'}}>
      <h3 className="h3" style={{marginBottom:'20px'}}>Contact Agent</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{marginBottom:'20px'}}>
          <label style={{display:'block', marginBottom:'8px', fontWeight:'600'}}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            required
            style={{width:'100%', padding:'12px', border:'1px solid #ddd', borderRadius:'4px'}}
          />
        </div>

        <div className="form-group" style={{marginBottom:'20px'}}>
          <label style={{display:'block', marginBottom:'8px', fontWeight:'600'}}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            style={{width:'100%', padding:'12px', border:'1px solid #ddd', borderRadius:'4px'}}
          />
        </div>

        <div className="form-group" style={{marginBottom:'20px'}}>
          <label style={{display:'block', marginBottom:'8px', fontWeight:'600'}}>Phone (+91)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            maxLength="10"
            required
            style={{width:'100%', padding:'12px', border:'1px solid #ddd', borderRadius:'4px'}}
          />
        </div>

        <div className="form-group" style={{marginBottom:'20px'}}>
          <label style={{display:'block', marginBottom:'8px', fontWeight:'600'}}>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="I'm interested in this property..."
            rows="4"
            required
            style={{width:'100%', padding:'12px', border:'1px solid #ddd', borderRadius:'4px', fontFamily:'inherit'}}
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
```

---

**Continue in next message due to length...**
