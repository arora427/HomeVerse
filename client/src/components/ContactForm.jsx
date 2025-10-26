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