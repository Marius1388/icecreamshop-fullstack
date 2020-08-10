const express = require('express');
const router = express.Router();

// Product Model
const Product = require('../../models/Product');

//@route GET /
//@desc Get all products
//@acces Public
router.get('/', (req, res) => {
	Product.find().then((items) => res.json(items));
});

module.exports = router;
