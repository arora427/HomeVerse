# Final Frontend Files

## 12. EditProperty Page

**Path:** `client/src/pages/EditProperty.jsx`

```jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'react-toastify';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    propertyType: 'rent',
    agentName: '',
    agentAvatar: ''
  });
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/api/properties/${id}`);
      const property = response.data;
      
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        squareFeet: property.squareFeet,
        propertyType: property.propertyType,
        agentName: property.agent.name,
        agentAvatar: property.agent.avatar
      });
    } catch (error) {
      toast.error('Failed to load property');
      navigate('/my-properties');
    } finally {
      setLoading(false);
    }
  };

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
    setNewImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

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
      data.append('agentAvatar', formData.agentAvatar);

      newImages.forEach((image) => {
        data.append('images', image);
      });

      await api.put(`/api/properties/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Property updated successfully!');
      navigate('/my-properties');
    } catch (error) {
      toast.error(error.message || 'Failed to update property');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main style={{ minHeight: '60vh', padding: '100px 0' }}>
        <div className="container">
          <p>Loading property...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '60vh', padding: '100px 0' }}>
      <div className="container">
        <h1 className="h1" style={{ marginBottom: '40px' }}>Edit Property</h1>

        <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
          <div style={{ display: 'grid', gap: '20px' }}>
            
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                required
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Add More Images (Optional)</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                Add up to 8 new images (will be added to existing images)
              </small>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <button 
                type="submit" 
                className="btn" 
                disabled={submitting}
                style={{ flex: 1 }}
              >
                {submitting ? 'Updating...' : 'Update Property'}
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

export default EditProperty;
```

---

## 13. App.js

**Path:** `client/src/App.js`

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import MyProperties from './pages/MyProperties';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            
            <Route path="/my-properties" element={
              <PrivateRoute>
                <MyProperties />
              </PrivateRoute>
            } />
            
            <Route path="/add-property" element={
              <PrivateRoute>
                <AddProperty />
              </PrivateRoute>
            } />
            
            <Route path="/edit-property/:id" element={
              <PrivateRoute>
                <EditProperty />
              </PrivateRoute>
            } />
          </Routes>

          <Footer />
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

---

## 14. index.js

**Path:** `client/src/index.js`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 15. index.css

**Path:** `client/src/index.css`

```css
/* Minimal global styles - most styling is in public/assets/css/style.css */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

/* Additional utility styles */
.w-100 {
  width: 100%;
}
```

---

## 🎉 Complete! Your frontend is now ready!

### Final Steps to Run the Application:

1. **Copy all the components** from the implementation guides into their respective files
2. **Update public/index.html** as shown in FRONTEND_IMPLEMENTATION_GUIDE.md
3. **Start the backend server**:
   ```powershell
   cd C:\Users\saksh\Desktop\homeverse-master\homeverse-fullstack\server
   npm run dev
   ```

4. **Start the frontend**:
   ```powershell
   cd C:\Users\saksh\Desktop\homeverse-master\homeverse-fullstack\client
   npm start
   ```

5. **Access the application**:
   - Frontend: http://localhost:3000
   - API: http://localhost:5000

### Demo Login Credentials:
After running `npm run seed` in the server directory:
- **Email**: rajesh@homeverse.in
- **Password**: password123

### Features Available:
✅ Browse all properties (public)
✅ View property details with contact form
✅ User registration and login
✅ Add new properties with image uploads
✅ Edit your own properties
✅ Delete your own properties
✅ View and manage "My Properties"
✅ Indian Rupee (₹) currency formatting
✅ Indian phone number validation
✅ Exact same design as original Homeverse

Enjoy your full-stack Indian real estate platform! 🏠
