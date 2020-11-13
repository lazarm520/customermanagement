const mongoose = require("mongoose");

const Order_Details = mongoose.model(
	"Order_Details",
	new mongoose.Schema(
		{
			quantity: {
				type: String,
				required: true
			},
			observation: {
				type: [String],
			},
			responsible: {
				type: [String],
			},
			order_date: {
				type: Date,
				"default": Date.now
			},
			delivered: {
				type: Boolean,
			},
			delivering_date: {
				type: Date,
			},
			delivering_code: {
				type: String,
			},
			finished: {
				type: Boolean,
			},
			orderId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Order",
					required: true
				}
			]
		},
		{ timestamps: true }
	)
);

module.exports = Order_Details;
