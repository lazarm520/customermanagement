const db = require("../models");
const Collection = db.collection;
const Project = db.project;

// Create and Save a new Collection
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name || !req.body.projectId ) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	Project.findById(req.body.projectId)
		.then(project => {
			if (!project)
				res.status(404).send({ message: "Not found Project with id " + id });
			else {
				// Create a Collection
				const collection = new Collection({
					name: req.body.name,
					projectId: project
				});

				// Save Collection in the database
				collection
					.save(collection)
					.then(data => {
						res.status(201).send({
							message: "Collection successfully created",
							data,
							error: false
						});
					})
					.catch(err => {
						res.status(500).send({
							message: err.message || "Some error occurred while creating the Collection.",
							error: true
						});
					});
			}
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Project with id=" + id });
		});

};


// Retrieve all Collection from the database.
exports.findAll = (req, res) => {

	Collection.find({})
		.then(data => {
			res.status(200).send({
				data,
				error: false
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Collection.",
				error: true
			});
		});
};


// Find a single Collection with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Collection.findById(id)
		.then(data => {
			if (!data)
				res.status(404).send({ message: "Not found Collection with id " + id });
			else res.status(200).send(data);
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Collection with id=" + id });
		});
};

// Update a Collection by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}

	Project.findById(req.body.project[0])
		.then(project => {
			if (!project)
				res.status(404).send({ message: "Not found Project with id " + id });
			else {
				const id = req.params.id;
				const collection = {
					name: req.body.title,
					projectId: project
				}
				console.log({...req.body, project});

				Collection.findByIdAndUpdate(id, collection, { useFindAndModify: false })
					.then(data => {
						console.log(data);
						if (!data) {
							res.status(404).send({
								message: `Cannot update Collection with id=${id}. Maybe Collection was not found!`
							});
						} else res.status(200).send({ message: "Collection was updated successfully." });
					})
					.catch(err => {
						res.status(500).send({
							message: "Error updating Collection with id=" + id
						});
					});
		}})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Project with id=" + id });
		});
};

// Delete a Collection with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Collection.findByIdAndRemove(id, { useFindAndModify: false })
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete Collection with id=${id}. Maybe Collection was not found!`
				});
			} else {
				res.status(204).send({
					message: "Collection was deleted successfully!"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Collection with id=" + id
			});
		});
};

// Delete all Collections from the database.
exports.deleteAll = (req, res) => {
	Collection.deleteMany({})
		.then(data => {
			res.status(204).send({
				message: `${data.deletedCount} Collections were deleted successfully!`
			});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all collections."
			});
		});
};


// Retrieve all Collection from the database.
exports.findAllByProjectId = (req, res) => {
	if (!req.params.projectId) {
		return res.status(400).send({
			message: "Data can not be empty!"
		});
	}
	const projectId = req.params.projectId;
	Collection.find({ projectId })
		.then(data => {
			res.status(200).send({
				data,
				error: false
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Collection.",
				error: true
			});
		});
};
