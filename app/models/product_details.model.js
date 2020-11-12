const mongoose = require("mongoose");

const Product_Details = mongoose.model(
	"Product_Details",
	new mongoose.Schema(
		{
			price: {
				type: String,
			},
			weight: {
				type: String,
			},
			description: {
				type: String,
			},
			images: {
				type: String,
			},
			productId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product"
				}
			],
		},
		{ timestamps: true }
	)
);

module.exports = Product_Details;
