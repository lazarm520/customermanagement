const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

	User.find({})
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
