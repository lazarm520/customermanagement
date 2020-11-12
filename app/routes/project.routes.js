module.exports = app => {
	const controller = require("../controllers/project.controller.js");

	var router = require("express").Router();

	// Create a new Project
	router.post("/", controller.create);

	// Retrieve all Project
	router.get("/", controller.findAll);

	// Retrieve a single Project with id
	router.get("/:id", controller.findOne);

	// Update a Project with id
	router.put("/:id", controller.update);

	// Delete a Project with id
	router.delete("/:id", controller.delete);

	// Create a new Project
	router.delete("/", controller.deleteAll);

	// Retrieve a all Project by User (Creator)
	router.get("/:userId", controller.findAllByUserId);

	app.use("/api/projects", router);
};
