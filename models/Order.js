const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const OrderSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	flavour: {
		type: String,
		required: true,
	},
	numberOfScoops: {
		type: Number,
		required: true,
	},
	pricePerScoop: {
		type: Number,
		required: true,
	},
	totalCost: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	lastModified: {
		type: Date,
	},
});

module.exports = mongoose.model('Order', OrderSchema);
