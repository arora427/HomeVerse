const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Property ID is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);
