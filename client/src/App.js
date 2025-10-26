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