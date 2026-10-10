const Mess = require('../models/Mess');

// @desc    Get list of Mess/Meal services
// @route   GET /api/mess
// @access  Public
exports.getMessList = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { name: searchRegex },
        { area: searchRegex },
        { tag: searchRegex },
        { note: searchRegex }
      ];
    }

    const messList = await Mess.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: messList.length,
      data: messList
    });
  } catch (error) {
    console.error('Error fetching mess list:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Mess services'
    });
  }
};

// @desc    Get single Mess service by ID
// @route   GET /api/mess/:id
// @access  Public
exports.getMessById = async (req, res) => {
  try {
    const mess = await Mess.findById(req.params.id);
    if (!mess) {
      return res.status(404).json({
        success: false,
        message: 'Mess service listing not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: mess
    });
  } catch (error) {
    console.error('Error fetching mess details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch Mess details'
    });
  }
};
