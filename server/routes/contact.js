const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const Property = require('../models/Property');

// Indian mobile pattern: starts with 6-9, 10 digits
const indianMobileRegex = /^[6-9]\d{9}$/;

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route   POST /api/contact
// @desc    Submit a contact inquiry for a property
// @access  Public
router.post('/', [
  body('propertyId').notEmpty().withMessage('Property ID is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(indianMobileRegex).withMessage('Valid Indian phone number is required (10 digits starting with 6-9)'),
  body('message').trim().notEmpty().withMessage('Message is required')
], handleValidation, async (req, res) => {
  try {
    const { propertyId, name, email, phone, message } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Create contact record
    const contact = new Contact({
      propertyId,
      name,
      email,
      phone: `+91-${phone}`,
      message
    });

    await contact.save();

    res.status(201).json({ 
      message: 'Contact request submitted successfully',
      contact
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact inquiries (for admin/property owners)
// @access  Public (in production, should be protected)
router.get('/', async (req, res) => {
  try {
    const { propertyId } = req.query;
    
    const query = {};
    if (propertyId) query.propertyId = propertyId;

    const contacts = await Contact.find(query)
      .populate('propertyId', 'title location')
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
