import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { isValidEmail, isValidIndianPhone } from '../utils/format';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!isLogin && !formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }

    if (!isLogin && !isValidIndianPhone(formData.phone)) {
      toast.error('Please enter a valid 10-digit Indian phone number starting with 6-9');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    let result;
    if (isLogin) {
      result = await login({
        email: formData.email,
        password: formData.password
      });
    } else {
      result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
    }

    setLoading(false);

    if (result.success) {
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
      onClose();
      setFormData({ name: '', email: '', phone: '', password: '' });
    } else {
      toast.error(result.message);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', phone: '', password: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <ion-icon name="close-outline"></ion-icon>
        </button>

        <h2 className="auth-modal-title">
          {isLogin ? 'Login to Homeverse' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Phone Number</label>
              <div className="phone-input">
                <span className="phone-prefix">+91</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  maxLength="10"
                  required={!isLogin}
                />
              </div>
              <small>Enter 10-digit mobile number starting with 6-9</small>
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="btn auth-submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <p className="auth-switch-text">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={switchMode} className="auth-switch-btn">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
