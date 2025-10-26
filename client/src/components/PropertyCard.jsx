import React from 'react';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/format';

const PropertyCard = ({ property }) => {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/property-1.jpg';
    // In production, use relative URLs since server and client are on same domain
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