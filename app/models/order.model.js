const mongoose = require("mongoose");

const Order = mongoose.model(
	"Order",
	new mongoose.Schema(
		{
			order_code: {
				type: String,
				required: true
			},
			productId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true
				}
			],
			customerId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Customer",
					required: true
				}
			],
		},
		{ timestamps: true }
	)
);

module.exports = Order;
