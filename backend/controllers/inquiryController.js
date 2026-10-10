const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');
const Mess = require('../models/Mess');

// @desc    Submit an inquiry/booking request for a PG or Mess
// @route   POST /api/inquiries
// @access  Private (Logged-in students)
exports.createInquiry = async (req, res) => {
  try {
    const { propertyId, messId, message } = req.body;

    if (!propertyId && !messId) {
      return res.status(400).json({
        success: false,
        message: 'Please specify either a property (PG) ID or a mess service ID.'
      });
    }

    if (propertyId) {
      const propertyExists = await Property.findById(propertyId);
      if (!propertyExists) {
        return res.status(404).json({
          success: false,
          message: 'Referenced PG property not found.'
        });
      }
    }

    if (messId) {
      const messExists = await Mess.findById(messId);
      if (!messExists) {
        return res.status(404).json({
          success: false,
          message: 'Referenced Mess service not found.'
        });
      }
    }

    const inquiry = await Inquiry.create({
      user: req.user._id,
      property: propertyId || null,
      mess: messId || null,
      message: message ? message.trim() : 'Student inquiry for accommodation/mess availability',
      status: 'pending'
    });

    const populatedInquiry = await Inquiry.findById(inquiry._id)
      .populate('user', 'fullName email phone branch academicYear')
      .populate('property', 'name area price tag')
      .populate('mess', 'name area tag');

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! The owner/management has received your student contact details.',
      data: populatedInquiry
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit inquiry'
    });
  }
};

// @desc    Get current student's inquiries
// @route   GET /api/inquiries/my
// @access  Private
exports.getMyInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ user: req.user._id })
      .populate('property', 'name area price tag')
      .populate('mess', 'name area tag')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve your inquiries'
    });
  }
};
