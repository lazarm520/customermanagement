const mongoose = require("mongoose");
const config = require("../config/db.config");
mongoose.Promise = global.Promise;

// Connection
mongoose
	.connect(
		`mongodb://${config.HOST}:${config.PORT}/${config.DB}`, 
		{ useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Successfully connect to MongoDB.");
		initial();
	})
	.catch(err => {
		console.error("Connection error", err);
		process.exit();
	});

// db
const db = {};

db.user = require("./user.model");
db.role = require("./role.model");
db.project = require("./project.model");
db.collection = require("./collection.model");
db.product_details = require("./product_details.model");
db.product = require("./product.model");
db.customer = require("./customer.model");
db.customer_details = require("./customer_details.model");
Role = require("./role.model");

/*
db.user_roles = mongoose.model(
	"user_roles",
	new mongoose.Schema({
		userId: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		],
		roleId: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Role"
			}
		],
	})
);
*/

db.ROLES = ["user", "admin", "moderator"];

// Roles init
function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err && count === 0) {
			new Role({
				name: "user"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'user' to roles collection");
			});

			new Role({
				name: "moderator"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'moderator' to roles collection");
			});

			new Role({
				name: "admin"
			}).save(err => {
				if (err) {
					console.log("error", err);
				}

				console.log("added 'admin' to roles collection");
			});
		}
	});
}

module.exports = db;