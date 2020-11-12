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
			_creator: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User"
				}
			],
		},
		{ timestamps: true }
	)
);

module.exports = Project;
