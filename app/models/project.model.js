const mongoose = require("mongoose");

const Project = mongoose.model(
	"Project",
	new mongoose.Schema(
		{
			title: {
				type: String,
			},
			description: {
				type: String,
			},
		},
		{ timestamps: true }
	)
);

module.exports = Project;
