const db = require("../models");
const Order = db.order;
const Order_Details = db.order_details;
const Product = db.product;
const Customer = db.customer;

// Create and Save a new Order
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}
	if (!req.body.order_code 
		|| !req.body.productId 
		|| !req.body.customerId 
		|| !req.body.price
		|| !req.body.weight
		|| !req.body.description
		|| !req.body.images) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	// Find Product
	var prod;

	Product.findById(req.body.productId).then(product => {
			if (!product) {res.status(404)}
			else prod = product;
		}).catch(err => {res.status(500)});

	// Find Customer
	var cust;

	Customer.findById(req.body.customerId).then(customer => {
			if (!customer) {res.status(404)}
			else cust = customer;
		}).catch(err => {res.status(500)});

	// Create a Order
	const order = new Order({
		order_code: req.body.order_code,
		productId: prod,
		customerId: cust,
	});

	// Save Order in the database
	order
		.save(order)
		.then(order => {

			// Create a Order_Details
			const order_details = new Order_Details({
				quantity: req.body.quantity,
				observation: req.body.observation,
				responsible: req.body.responsible,
				delivered: req.body.delivered,
				delivering_date: req.body.delivering_date,
				delivering_code: req.body.delivering_code,
				finished: req.body.finished,
				orderId: order
			});

			// Save Order_Details in the database
			order_details
				.save(order_details)
				.then(order_details => {
					res.status(201).send({
						message: "Order and Order_Details successfully created",
						data: [order, order_details],
						error: false
					});
				})
				.catch(err => {
					res.status(500).send({
						message: err.message || "Some error occurred while creating the Order_Details.",
						error: true
					});
				});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Order.",
				error: true
			});
		});

};


// Retrieve all Order from the database.
exports.findAll = (req, res) => {

	Order.find({ include: [{ model: db.order_details }]})
		.then(data => {
			res.status(200).send({
				data,
				error: false
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Order.",
				error: true
			});
		});
};


// Find a single Order with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Order.findById(id, { include: [{ model: db.order_details }]})
		.then(data => {
			if (!data)
				res.status(404).send({ message: "Not found Order with id " + id });
			else res.status(200).send(data);
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Order with id=" + id });
		});
};

// Update a Order by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}

	const id = req.params.id;

	Order.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(order => {
			console.log(order);
			if (!order) {
				res.status(404).send({
					message: `Cannot update Order with id=${id}. Maybe Order was not found!`
				});
			} else {

				const idD = order._id;

				Order_Details.findByIdAndUpdate(idD, req.body, { useFindAndModify: false })
					.then(order_details => {
						console.log(order_details);
						if (!order_details) {
							res.status(404).send({
								message: `Order was updated successfully but Order_Details cannot with id=${idD}. 
								Maybe Order_Details was not found!`
							});
						} else { res.status(200).send({ message: "Order and Order_Details was updated successfully." })}
					})
					.catch(err => {
						res.status(500).send({
							message: "Error updating Order_Details with id=" + idD
						});
					});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Order with id=" + id
			});
		});
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Order.findById(id)
		.then(order => {
			if (!order)
				res.status(404).send({ message: "Not found Order with id " + id });
			else {
				const idD = order._id;

				Order_Details.findByIdAndRemove(idD, { useFindAndModify: false })
					.then(order_details => {
						if (!order_details) {
							res.status(404).send({
								message: `Cannot delete Order_Details with id=${idD}. Maybe Order_Details was not found!`
							});
						} else {

							Order.findByIdAndRemove(id, { useFindAndModify: false })
								.then(data => {
									if (!data) {
										res.status(404).send({
											message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
										});
									} else {
										res.status(204).send({
											message: "Order and Order_Details was deleted successfully!"
										});
									}
								})
								.catch(err => {
									res.status(500).send({
										message: "Could not delete Order with id=" + id
									});
								});
						}
					})
					.catch(err => {
						res.status(500).send({
							message: "Could not delete Order_Details with id=" + idD
						});
					});
			}
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Order with id=" + id });
		});

};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
	Order_Details.deleteMany({})
		.then(order_details => {

			Order.deleteMany({})
				.then(data => {
					res.status(204).send({
						message: `${order.deletedCount} Orders and ${order_details.deletedCount} Order_Details were deleted successfully!`
					});
				})
				.catch(err => {
					res.status(500).send({
						message:
							err.message || "Some error occurred while removing all orders."
					});
				});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all order_details."
			});
		});
};
