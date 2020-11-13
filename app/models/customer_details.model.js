const mongoose = require("mongoose");

const Customer_Details = mongoose.model(
	"Customer_Details",
	new mongoose.Schema(
		{
			address: {
				type: String,
			},
			postal_code: {
				type: String,
			},
			city: {
				type: String,
			},
			country: {
				type: String,
			},
			gender: {
				type: String,
			},
			birthday: {
				type: Date,
			},
			image: {
				type: String,
			},
			customerId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Customer",
					required: true
				}
			]
		},
		{ timestamps: true }
	)
);

module.exports = Customer_Details;
