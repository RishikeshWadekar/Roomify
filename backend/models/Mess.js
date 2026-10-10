const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Mess service name is required'],
    trim: true
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
  search: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mess', messSchema);
