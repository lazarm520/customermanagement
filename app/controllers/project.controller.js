const db = require("../models");
const Project = db.project;
const User = db.user;

// Create and Save a new Project
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title || !req.body.userId ) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	User.findById(req.body.userId)
		.then(user => {
			if (!user)
				res.status(404).send({ message: "Not found User with id " + id });
			else {
				// Create a Project
				const project = new Project({
					title: req.body.title,
					description: req.body.description,
					_creator: user
				});

				// Save Project in the database
				project
					.save(project)
					.then(data => {
						res.send({
							message: "Project successfully created",
							data,
							error: false
						});
					})
					.catch(err => {
						res.status(500).send({
							message: err.message || "Some error occurred while creating the Project.",
							error: true
						});
					});
			}
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving User with id=" + id });
		});

};


// Retrieve all Project from the database.
exports.findAll = (req, res) => {

	Project.find({})
		.then(data => {
			res.send({
				data,
				error: false
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Project.",
				error: true
			});
		});
};


// Find a single Project with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Project.findById(id)
		.then(data => {
			if (!data)
				res.status(404).send({ message: "Not found Project with id " + id });
			else res.send(data);
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Project with id=" + id });
		});
};

// Update a Project by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}

	User.findById(req.body._creator[0])
		.then(user => {
			if (!user)
				res.status(404).send({ message: "Not found User with id " + id });
			else {
				const id = req.params.id;
				const project = {
					title: req.body.title,
					description: req.body.description,
					_creator: user
				}
				console.log({...req.body, user});

				Project.findByIdAndUpdate(id, project, { useFindAndModify: false })
					.then(data => {
						console.log(data);
						if (!data) {
							res.status(404).send({
								message: `Cannot update Project with id=${id}. Maybe Project was not found!`
							});
						} else res.send({ message: "Project was updated successfully." });
					})
					.catch(err => {
						res.status(500).send({
							message: "Error updating Project with id=" + id
						});
					});
		}})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving User with id=" + id });
		});
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Project.findByIdAndRemove(id, { useFindAndModify: false })
		.then(data => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
				});
			} else {
				res.send({
					message: "Project was deleted successfully!"
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Project with id=" + id
			});
		});
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
	Project.deleteMany({})
		.then(data => {
			res.send({
				message: `${data.deletedCount} Projects were deleted successfully!`
			});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all projects."
			});
		});
};


// Retrieve all Project from the database.
exports.findAllByUserId = (req, res) => {
	if (!req.params.userId) {
		return res.status(400).send({
			message: "Data can not be empty!"
		});
	}
	const userId = req.params.userId;
	Project.find({ userId })
		.then(data => {
			res.send({
				data,
				error: false
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Project.",
				error: true
			});
		});
};
