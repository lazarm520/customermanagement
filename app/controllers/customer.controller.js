const db = require("../models");
const Customer = db.customer;
const Customer_Details = db.customer_details;

// Create and Save a new Customer
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}
	if (!req.body.firstname 
		|| !req.body.lastname 
		|| !req.body.phone 
		|| !req.body.email
		|| !req.body.address
		|| !req.body.postal_code
		|| !req.body.city
		|| !req.body.country
		|| !req.body.gender
		|| !req.body.birthday
		|| !req.body.image) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	// Create a Customer
	const customer = new Customer({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		phone: req.body.phone,
		email: req.body.email,
	});

	// Save Customer in the database
	customer
		.save(customer)
		.then(customer => {

			// Create a Customer_Details
			const customer_details = new Customer_Details({
				address: req.body.address,
				postal_code: req.body.postal_code,
				city: req.body.city,
				country: req.body.country,
				gender: req.body.gender,
				birthday: req.body.birthday,
				image: req.body.image,
				customerId: customer
			});

			// Save Customer_Details in the database
			customer_details
				.save(customer_details)
				.then(customer_details => {
					res.send({
						message: "Customer and Customer_Details successfully created",
						data: [customer, customer_details],
						error: false
					});
				})
				.catch(err => {
					res.status(500).send({
						message: err.message || "Some error occurred while creating the Customer_Details.",
						error: true
					});
				});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Customer.",
				error: true
			});
		});

};


// Retrieve all Customer from the database.
exports.findAll = (req, res) => {

	Customer.find({ include: [{ model: db.customer_details }]})
		.then(data => {
			res.send({
				data,
				error: false
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Customer.",
				error: true
			});
		});
};


// Find a single Customer with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Customer.findById(id, { include: [{ model: db.customer_details }]})
		.then(data => {
			if (!data)
				res.status(404).send({ message: "Not found Customer with id " + id });
			else res.send(data);
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Customer with id=" + id });
		});
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}

	const id = req.params.id;

	Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(customer => {
			console.log(customer);
			if (!customer) {
				res.status(404).send({
					message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
				});
			} else {

				const idD = customer._id;

				Customer_Details.findByIdAndUpdate(idD, req.body, { useFindAndModify: false })
					.then(customer_details => {
						console.log(customer_details);
						if (!customer_details) {
							res.status(404).send({
								message: `Customer was updated successfully but Customer_Details cannot with id=${idD}. 
								Maybe Customer_Details was not found!`
							});
						} else { res.send({ message: "Customer and Customer_Details was updated successfully." })}
					})
					.catch(err => {
						res.status(500).send({
							message: "Error updating Customer_Details with id=" + idD
						});
					});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Customer with id=" + id
			});
				});
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Customer.findById(id)
		.then(customer => {
			if (!customer)
				res.status(404).send({ message: "Not found Customer with id " + id });
			else {
				const idD = customer._id;

				Customer_Details.findByIdAndRemove(idD, { useFindAndModify: false })
					.then(customer_details => {
						if (!customer_details) {
							res.status(404).send({
								message: `Cannot delete Customer_Details with id=${idD}. Maybe Customer_Details was not found!`
							});
						} else {

							Customer.findByIdAndRemove(id, { useFindAndModify: false })
								.then(data => {
									if (!data) {
										res.status(404).send({
											message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
										});
									} else {
										res.send({
											message: "Customer and Customer_Details was deleted successfully!"
										});
									}
								})
								.catch(err => {
									res.status(500).send({
										message: "Could not delete Customer with id=" + id
									});
								});
						}
					})
					.catch(err => {
						res.status(500).send({
							message: "Could not delete Customer_Details with id=" + idD
						});
					});
			}
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Customer with id=" + id });
		});

};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
	Customer_Details.deleteMany({})
		.then(customer_details => {

			Customer.deleteMany({})
				.then(data => {
					res.send({
						message: `${customer.deletedCount} Customers and ${customer_details.deletedCount} Customer_Details were deleted successfully!`
					});
				})
				.catch(err => {
					res.status(500).send({
						message:
							err.message || "Some error occurred while removing all customers."
					});
				});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all customer_details."
			});
		});
};
