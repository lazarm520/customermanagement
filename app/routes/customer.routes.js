module.exports = app => {
	const controller = require("../controllers/customer.controller.js");

	var router = require("express").Router();

	// Create a new Customer
	router.post("/", controller.create);

	// Retrieve all Customer
	router.get("/", controller.findAll);

	// Retrieve a single Customer with id
	router.get("/:id", controller.findOne);

	// Update a Customer with id
	router.put("/:id", controller.update);

	// Delete a Customer with id
	router.delete("/:id", controller.delete);

	// Create a new Customer
	router.delete("/", controller.deleteAll);

	app.use("/api/customers", router);
};
