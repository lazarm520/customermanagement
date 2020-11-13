const mongoose = require("mongoose");

const Collection = mongoose.model(
	"Collection",
	new mongoose.Schema(
		{
			name: {
				type: String,
				required: true
			},
			projectId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Project",
					required: true
				}
			],
		},
		{ timestamps: true }
	)
);

module.exports = Collection;
