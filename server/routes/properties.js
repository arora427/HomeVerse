const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// @route   GET /api/properties
// @desc    Get all properties with optional filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { propertyType, location, page = 1, limit = 10, ownerId } = req.query;
    
    const query = {};
    if (propertyType) query.propertyType = propertyType;
    if (location) query.location = new RegExp(location, 'i');
    if (ownerId) query.owner = ownerId;

    const properties = await Property.find(query)
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Property.countDocuments(query);

    res.json({
      properties,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/properties/:id
// @desc    Get single property by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone');
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/properties
// @desc    Create a new property
// @access  Private
router.post('/', [auth, upload.array('images', 8)], [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('bedrooms').isInt({ min: 0 }).withMessage('Bedrooms must be a positive integer'),
  body('bathrooms').isInt({ min: 0 }).withMessage('Bathrooms must be a positive integer'),
  body('squareFeet').isInt({ min: 0 }).withMessage('Square feet must be a positive integer'),
  body('propertyType').isIn(['rent', 'sale']).withMessage('Property type must be rent or sale'),
  body('agentName').trim().notEmpty().withMessage('Agent name is required')
], handleValidation, async (req, res) => {
  try {
    const { title, description, price, location, bedrooms, bathrooms, squareFeet, propertyType, agentName, agentAvatar } = req.body;

    // Get uploaded image paths
    const imagePaths = (req.files || []).map(f => `/uploads/${f.filename}`);

    const property = new Property({
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      squareFeet,
      propertyType,
      images: imagePaths,
      owner: req.user.id,
      agent: {
        name: agentName,
        avatar: agentAvatar || '/assets/images/author.jpg'
      }
    });

    await property.save();

    const populatedProperty = await Property.findById(property._id)
      .populate('owner', 'name email phone');

    res.status(201).json(populatedProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/properties/:id
// @desc    Update a property
// @access  Private (owner only)
router.put('/:id', [auth, upload.array('images', 8)], [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('location').optional().trim().notEmpty().withMessage('Location cannot be empty'),
  body('bedrooms').optional().isInt({ min: 0 }).withMessage('Bedrooms must be a positive integer'),
  body('bathrooms').optional().isInt({ min: 0 }).withMessage('Bathrooms must be a positive integer'),
  body('squareFeet').optional().isInt({ min: 0 }).withMessage('Square feet must be a positive integer'),
  body('propertyType').optional().isIn(['rent', 'sale']).withMessage('Property type must be rent or sale'),
  body('agentName').optional().trim().notEmpty().withMessage('Agent name cannot be empty')
], handleValidation, async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const { title, description, price, location, bedrooms, bathrooms, squareFeet, propertyType, agentName, agentAvatar } = req.body;

    // Update fields
    if (title) property.title = title;
    if (description) property.description = description;
    if (price) property.price = price;
    if (location) property.location = location;
    if (bedrooms) property.bedrooms = bedrooms;
    if (bathrooms) property.bathrooms = bathrooms;
    if (squareFeet) property.squareFeet = squareFeet;
    if (propertyType) property.propertyType = propertyType;
    if (agentName) property.agent.name = agentName;
    if (agentAvatar) property.agent.avatar = agentAvatar;

    // Add new images if provided
    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(f => `/uploads/${f.filename}`);
      property.images = property.images.concat(newImagePaths);
    }

    await property.save();

    const updatedProperty = await Property.findById(property._id)
      .populate('owner', 'name email phone');

    res.json(updatedProperty);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete a property
// @access  Private (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await property.deleteOne();

    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
