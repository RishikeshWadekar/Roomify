const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['boys', 'girls'],
    required: [true, 'Property type must be boys or girls']
  },
  tag: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: String,
    default: '0 reviews'
  },
  area: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    default: 'Contact property'
  },
  search: {
    type: String,
    default: ''
  },
  photos: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
