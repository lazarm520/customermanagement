const mongoose = require("mongoose");

const Collection = mongoose.model(
	"Collection",
	new mongoose.Schema(
		{
			name: {
				type: String,
			},
			projectId: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Project"
				}
			],
		},
		{ timestamps: true }
	)
);

module.exports = Collection;
