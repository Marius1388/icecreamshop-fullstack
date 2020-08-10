const express = require('express');
const router = express.Router();

// Product Model
const Order = require('../../models/Order');

//@route GET /
//@desc Get all orders
//@acces Public
router.get('/', (req, res) => {
	Order.find()
		//sort by date descendent
		.sort({ createdAt: -1 })
		.then((orders) => res.json(orders));
});

//@route GET /:id
//@desc Get one order by id
//@acces Public
router.get('/:id', (req, res) => {
	Order.findById(req.params.id)
		//sort by date descendent
		.then((order) => res.json(order));
});

//@route POST /
//@desc Create an order
//@acces Private(should be)
router.post('/', (req, res) => {
	const newOrder = new Order({
		userId: req.body.userId,
		flavour: req.body.flavour,
		numberOfScoops: req.body.numberOfScoops,
		pricePerScoop: req.body.pricePerScoop,
		totalCost: req.body.totalCost,
	});
	newOrder
		.save()
		.then((order) => res.json(order))
		.catch((err) => console.log(err));
});

//@route DELETE orders/:id
//@desc Delete an order
//@acces Private(should be)
router.delete('/:id', (req, res) => {
	Order.findById(req.params.id)
		.then((order) => order.deleteOne().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

//@route EDIT orders/:id
//@desc edit an order
//@acces Private(should be)
router.put('/:id', (req, res) => {
	Order.findByIdAndUpdate(
		req.params.id,
		{
			userId: req.body.userId,
			flavour: req.body.flavour,
			numberOfScoops: req.body.numberOfScoops,
			pricePerScoop: req.body.pricePerScoop,
			totalCost: req.body.totalCost,
			lastModified: Date.now(),
		},
		{ new: true },
		function (err, order) {
			if (err) {
				res.status(404).json({ success: false });
			} else {
				res.json(order);
			}
		}
	);
});

module.exports = router;
