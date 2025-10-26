
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { formatINR } from '../utils/format';
import ContactForm from '../components/ContactForm';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/property-1.jpg';
    // In production, use relative URLs since server and client are on same domain
    return imagePath;
  };

  if (loading) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading property details...</p>
      </main>
    );
  }

  if (!property) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Property not found</p>
      </main>
    );
  }

  const priceText = property.propertyType === 'rent' 
    ? `${formatINR(property.price)}/Month` 
    : formatINR(property.price);

  return (
    <main>
      <section style={{ padding: '100px 0 50px' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: '1fr', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Image Gallery */}
            <div>
              <img 
                src={getImageUrl(property.images[0])} 
                alt={property.title}
                style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
              />
              {property.images.length > 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                  {property.images.slice(1).map((img, idx) => (
                    <img 
                      key={idx}
                      src={getImageUrl(img)} 
                      alt={`${property.title} ${idx + 2}`}
                      style={{ width: '100%', borderRadius: '4px', height: '150px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className={`card-badge ${property.propertyType === 'rent' ? 'green' : 'orange'}`}>
                  {property.propertyType === 'rent' ? 'For Rent' : 'For Sale'}
                </div>
                <h2 className="h2" style={{ color: 'var(--orange-soda)', margin: 0 }}>{priceText}</h2>
              </div>

              <h1 className="h1" style={{ marginBottom: '15px' }}>{property.title}</h1>
              
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '25px', color: '#666' }}>
                <ion-icon name="location" style={{ fontSize: '20px' }}></ion-icon>
                {property.location}
              </p>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '20px', 
                marginBottom: '30px',
                padding: '25px',
                background: 'var(--cultured-2)',
                borderRadius: '8px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <ion-icon name="bed-outline" style={{ fontSize: '32px', color: 'var(--orange-soda)' }}></ion-icon>
                  <p style={{ fontWeight: 'bold', margin: '10px 0 0' }}>{property.bedrooms} Bedrooms</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <ion-icon name="man-outline" style={{ fontSize: '32px', color: 'var(--orange-soda)' }}></ion-icon>
                  <p style={{ fontWeight: 'bold', margin: '10px 0 0' }}>{property.bathrooms} Bathrooms</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <ion-icon name="square-outline" style={{ fontSize: '32px', color: 'var(--orange-soda)' }}></ion-icon>
                  <p style={{ fontWeight: 'bold', margin: '10px 0 0' }}>{property.squareFeet} Sq Ft</p>
                </div>
              </div>

              <h3 className="h3" style={{ marginBottom: '15px' }}>Description</h3>
              <p style={{ lineHeight: '1.8', marginBottom: '30px', color: '#555' }}>{property.description}</p>

              {/* Agent Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px', 
                padding: '20px',
                background: 'var(--cultured-2)',
                borderRadius: '8px',
                marginBottom: '30px'
              }}>
                <img 
                  src={property.agent.avatar} 
                  alt={property.agent.name}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{property.agent.name}</p>
                  <p style={{ color: '#666', fontSize: '14px' }}>Estate Agent</p>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm propertyId={property._id} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertyDetails;
