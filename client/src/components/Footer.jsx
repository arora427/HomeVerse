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