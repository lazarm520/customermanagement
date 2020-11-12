const mongoose = require("mongoose");

const Customer = mongoose.model(
	"Customer",
	new mongoose.Schema(
		{
			firstname: {
				type: String,
			},
			lastname: {
				type: String,
			},
			phone: {
				type: String,
			},
			email: {
				type: String,
			},
			detailsId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Customer_Details"
				}
			]
		},
		{ timestamps: true }
	)
);

module.exports = Customer;
