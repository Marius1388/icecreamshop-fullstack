const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	pricePerScoop: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Product', ProductSchema);
