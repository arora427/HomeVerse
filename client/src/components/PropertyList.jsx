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