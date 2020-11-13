const mongoose = require("mongoose");

const Customer = mongoose.model(
	"Customer",
	new mongoose.Schema(
		{
			firstname: {
				type: String,
				required: true
			},
			lastname: {
				type: String,
				required: true
			},
			phone: {
				type: String,
			},
			email: {
				type: String,
			},
		},
		{ timestamps: true }
	)
);

module.exports = Customer;
