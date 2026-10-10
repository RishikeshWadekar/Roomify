const express = require('express');
const router = express.Router();
const { getMessList, getMessById } = require('../controllers/messController');

router.get('/', getMessList);
router.get('/:id', getMessById);

module.exports = router;
