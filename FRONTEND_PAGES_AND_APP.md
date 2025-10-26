# Frontend Pages and App Configuration

## 8. Home Page

**Path:** `client/src/pages/Home.jsx`

```jsx
import React from 'react';
import Hero from '../components/Hero';
import PropertyList from '../components/PropertyList';

const Home = () => {
  return (
    <>
      <main>
        <article>
          <Hero />
          <PropertyList />
          
          {/* CTA Section */}
          <section className="cta">
            <div className="container">
              <div className="cta-card">
                <div className="card-content">
                  <h2 className="h2 card-title">Looking for a dream home?</h2>
                  <p className="card-text">We can help you realize your dream of a new home</p>
                </div>
                <a href="#property" className="btn cta-btn">
                  <span>Explore Properties</span>
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </a>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default Home;
```

---

## 9. PropertyDetails Page

**Path:** `client/src/pages/PropertyDetails.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { formatINR } from '../utils/format';
import ContactForm from '../components/ContactForm';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    if (imagePath.startsWith('/uploads')) {
      return `${API_URL}${imagePath}`;
    }
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
```

---

## 10. MyProperties Page

**Path:** `client/src/pages/MyProperties.jsx`

```jsx
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
```

---

## 11. AddProperty Page

**Path:** `client/src/pages/AddProperty.jsx`

```jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const AddProperty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    propertyType: 'rent',
    agentName: user?.name || '',
    agentAvatar: ''
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 8) {
      toast.error('Maximum 8 images allowed');
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('location', formData.location);
      data.append('bedrooms', formData.bedrooms);
      data.append('bathrooms', formData.bathrooms);
      data.append('squareFeet', formData.squareFeet);
      data.append('propertyType', formData.propertyType);
      data.append('agentName', formData.agentName);
      data.append('agentAvatar', formData.agentAvatar || '/assets/images/author.jpg');

      images.forEach((image) => {
        data.append('images', image);
      });

      await api.post('/api/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Property added successfully!');
      navigate('/my-properties');
    } catch (error) {
      toast.error(error.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '60vh', padding: '100px 0' }}>
      <div className="container">
        <h1 className="h1" style={{ marginBottom: '40px' }}>Add New Property</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
          <div style={{ display: 'grid', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Luxury Villa in South Mumbai"
                required
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                rows="5"
                required
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  required
                  min="0"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Koramangala, Bengaluru, Karnataka"
                required
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Square Feet</label>
                <input
                  type="number"
                  name="squareFeet"
                  value={formData.squareFeet}
                  onChange={handleChange}
                  required
                  min="0"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Agent Name</label>
              <input
                type="text"
                name="agentName"
                value={formData.agentName}
                onChange={handleChange}
                placeholder="Your name or agent name"
                required
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Property Images (Max 8)</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                Select up to 8 images. Accepted formats: JPG, PNG, WEBP (Max 5MB each)
              </small>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button 
                type="submit" 
                className="btn" 
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? 'Adding Property...' : 'Add Property'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/my-properties')}
                className="btn"
                style={{ flex: 1, background: '#666' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddProperty;
```

---

**Continue to next message for EditProperty, App.js, and index files...**
