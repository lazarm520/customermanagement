const connection = require("./app/models");

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({	extended : true }));


app.get("/", (req, res) => {
	res.json({ message: "Welcome to Customer Management!!!! "})
})


// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/collection.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/customer.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

