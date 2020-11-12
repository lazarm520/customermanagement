module.exports = app => {
	const controller = require("../controllers/collection.controller.js");

	var router = require("express").Router();

	// Create a new Collection
	router.post("/", controller.create);

	// Retrieve all Collection
	router.get("/", controller.findAll);

	// Retrieve a single Collection with id
	router.get("/:id", controller.findOne);

	// Update a Collection with id
	router.put("/:id", controller.update);

	// Delete a Collection with id
	router.delete("/:id", controller.delete);

	// Create a new Collection
	router.delete("/", controller.deleteAll);

	// Retrieve a all Collection by Project
	router.get("/:projectId", controller.findAllByProjectId);

	app.use("/api/collections", router);
};
