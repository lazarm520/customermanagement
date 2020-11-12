const mongoose = require("mongoose");

const Product = mongoose.model(
	"Product",
	new mongoose.Schema(
		{
			ref: {
				type: String,
			},
			name: {
				type: String,
			},
			detailsId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product_Details"
				}
			],
			collectionId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Collection"
				}
			],
		},
		{ timestamps: true }
	)
);

module.exports = Product;
