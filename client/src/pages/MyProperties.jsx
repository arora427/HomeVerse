
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/format';
import { toast } from 'react-toastify';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await api.get(`/api/properties?ownerId=${user.id}`);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load your properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await api.delete(`/api/properties/${id}`);
      toast.success('Property deleted successfully');
      setProperties(properties.filter(p => p._id !== id));
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/assets/images/property-1.jpg';
    if (imagePath.startsWith('/uploads')) {
      return `${API_URL}${imagePath}`;
    }
    return imagePath;
  };

  if (loading) {
    return (
      <main style={{ minHeight: '60vh', padding: '100px 0' }}>
        <div className="container">
          <h1 className="h1">My Properties</h1>
          <p>Loading your properties...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '60vh', padding: '100px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 className="h1">My Properties</h1>
          <Link to="/add-property" className="btn">
            <ion-icon name="add-circle-outline" style={{ marginRight: '8px' }}></ion-icon>
            Add New Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>You haven't added any properties yet.</p>
            <Link to="/add-property" className="btn">Add Your First Property</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {properties.map((property) => (
              <div key={property._id} className="property-card" style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-1)' }}>
                <img 
                  src={getImageUrl(property.images[0])} 
                  alt={property.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '20px' }}>
                  <div className={`card-badge ${property.propertyType === 'rent' ? 'green' : 'orange'}`}>
                    {property.propertyType === 'rent' ? 'For Rent' : 'For Sale'}
                  </div>
                  <h3 className="h3" style={{ margin: '15px 0 10px' }}>{property.title}</h3>
                  <p style={{ color: 'var(--orange-soda)', fontWeight: 'bold', marginBottom: '15px' }}>
                    {property.propertyType === 'rent' ? `${formatINR(property.price)}/Month` : formatINR(property.price)}
                  </p>
                  <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    <ion-icon name="location" style={{ verticalAlign: 'middle' }}></ion-icon> {property.location}
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link 
                      to={`/property/${property._id}`} 
                      className="btn" 
                      style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '10px' }}
                    >
                      View
                    </Link>
                    <Link 
                      to={`/edit-property/${property._id}`} 
                      className="btn" 
                      style={{ flex: 1, textAlign: 'center', fontSize: '14px', padding: '10px', background: 'var(--prussian-blue)' }}
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(property._id)}
                      className="btn" 
                      style={{ flex: 1, fontSize: '14px', padding: '10px', background: '#dc3545', border: 'none' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyProperties;