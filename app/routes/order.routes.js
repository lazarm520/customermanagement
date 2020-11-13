module.exports = app => {
	const controller = require("../controllers/order.controller.js");

	var router = require("express").Router();

	// Create a new Order
	router.post("/", controller.create);

	// Retrieve all Order
	router.get("/", controller.findAll);

	// Retrieve a single Order with id
	router.get("/:id", controller.findOne);

	// Update a Order with id
	router.put("/:id", controller.update);

	// Delete a Order with id
	router.delete("/:id", controller.delete);

	// Create a new Order
	router.delete("/", controller.deleteAll);

	app.use("/api/orders", router);
};
