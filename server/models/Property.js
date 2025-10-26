const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: 0
  },
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: 0
  },
  squareFeet: {
    type: Number,
    required: [true, 'Square feet is required'],
    min: 0
  },
  propertyType: {
    type: String,
    enum: ['rent', 'sale'],
    required: [true, 'Property type is required']
  },
  images: [{
    type: String
  }],
  videos: [{
    type: String
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  agent: {
    name: {
      type: String,
      required: [true, 'Agent name is required']
    },
    avatar: {
      type: String,
      default: '/assets/images/author.jpg'
    }
  },
  status: {
    type: String,
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', PropertySchema);
