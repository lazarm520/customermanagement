const mongoose = require("mongoose");

const Product = mongoose.model(
	"Product",
	new mongoose.Schema(
		{
			refs: {
				type: String,
			},
			name: {
				type: String,
			},
			collectionId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Collection",
					required: true
				}
			],
		},
		{ timestamps: true }
	)
);

module.exports = Product;
