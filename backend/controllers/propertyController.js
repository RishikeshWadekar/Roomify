const Property = require('../models/Property');

// @desc    Get list of PGs filtered by gender/type (Boys/Girls/Near campus)
// @route   GET /api/pgs
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const { filter, search } = req.query;
    let query = {};

    if (filter) {
      const lower = filter.toLowerCase();
      if (lower === 'boys') {
        query.type = 'boys';
      } else if (lower === 'girls') {
        query.type = 'girls';
      } else if (lower === 'closest' || lower === 'near campus') {
        query.tag = { $regex: 'CAMPUS', $options: 'i' };
      }
    }

    if (search) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { name: searchRegex },
        { area: searchRegex },
        { tag: searchRegex },
        { note: searchRegex }
      ];
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch PG listings'
    });
  }
};

// @desc    Get single PG by ID
// @route   GET /api/pgs/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'PG listing not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Error fetching property details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch PG details'
    });
  }
};
