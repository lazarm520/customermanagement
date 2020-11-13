const db = require("../models");
const Product = db.product;
const Product_Details = db.product_details;

// Create and Save a new Product
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}
	if (!req.body.refs 
		|| !req.body.name 
		|| !req.body.collectionId 
		|| !req.body.price
		|| !req.body.weight
		|| !req.body.description
		|| !req.body.images) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	// Create a Product
	const product = new Product({
		refs: req.body.refs,
		name: req.body.name,
		collectionId: req.body.collectionId,
	});

	// Save Product in the database
	product
		.save(product)
		.then(product => {

			// Create a Product_Details
			const product_details = new Product_Details({
				price: req.body.address,
				weight: req.body.postal_code,
				description: req.body.city,
				images: req.body.country,
				productId: product
			});

			// Save Product_Details in the database
			product_details
				.save(product_details)
				.then(product_details => {
					res.status(201).send({
						message: "Product and Product_Details successfully created",
						data: [product, product_details],
						error: false
					});
				})
				.catch(err => {
					res.status(500).send({
						message: err.message || "Some error occurred while creating the Product_Details.",
						error: true
					});
				});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Product.",
				error: true
			});
		});

};


// Retrieve all Product from the database.
exports.findAll = (req, res) => {

	Product.find({ include: [{ model: db.product_details }]})
		.then(data => {
			res.status(200).send({
				data,
				error: false
			});
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Product.",
				error: true
			});
		});
};


// Find a single Product with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Product.findById(id, { include: [{ model: db.product_details }]})
		.then(data => {
			if (!data)
				res.status(404).send({ message: "Not found Product with id " + id });
			else res.status(200).send(data);
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Product with id=" + id });
		});
};

// Update a Product by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!"
		});
	}

	const id = req.params.id;

	Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(product => {
			console.log(product);
			if (!product) {
				res.status(404).send({
					message: `Cannot update Product with id=${id}. Maybe Product was not found!`
				});
			} else {

				const idD = product._id;

				Product_Details.findByIdAndUpdate(idD, req.body, { useFindAndModify: false })
					.then(product_details => {
						console.log(product_details);
						if (!product_details) {
							res.status(404).send({
								message: `Product was updated successfully but Product_Details cannot with id=${idD}. 
								Maybe Product_Details was not found!`
							});
						} else { res.status(200).send({ message: "Product and Product_Details was updated successfully." })}
					})
					.catch(err => {
						res.status(500).send({
							message: "Error updating Product_Details with id=" + idD
						});
					});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Product with id=" + id
			});
				});
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Product.findById(id)
		.then(product => {
			if (!product)
				res.status(404).send({ message: "Not found Product with id " + id });
			else {
				const idD = product._id;

				Product_Details.findByIdAndRemove(idD, { useFindAndModify: false })
					.then(product_details => {
						if (!product_details) {
							res.status(404).send({
								message: `Cannot delete Product_Details with id=${idD}. Maybe Product_Details was not found!`
							});
						} else {

							Product.findByIdAndRemove(id, { useFindAndModify: false })
								.then(data => {
									if (!data) {
										res.status(404).send({
											message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
										});
									} else {
										res.status(204).send({
											message: "Product and Product_Details was deleted successfully!"
										});
									}
								})
								.catch(err => {
									res.status(500).send({
										message: "Could not delete Product with id=" + id
									});
								});
						}
					})
					.catch(err => {
						res.status(500).send({
							message: "Could not delete Product_Details with id=" + idD
						});
					});
			}
		})
		.catch(err => {
			res
				.status(500)
				.send({ message: "Error retrieving Product with id=" + id });
		});

};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
	Product_Details.deleteMany({})
		.then(product_details => {

			Product.deleteMany({})
				.then(data => {
					res.status(204).send({
						message: `${product.deletedCount} Products and ${product_details.deletedCount} Product_Details were deleted successfully!`
					});
				})
				.catch(err => {
					res.status(500).send({
						message:
							err.message || "Some error occurred while removing all products."
					});
				});
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all product_details."
			});
		});
};
