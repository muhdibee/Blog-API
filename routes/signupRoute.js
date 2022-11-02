const express = require("express");
const signupRoute = express.Router();
const signupController = require("../controllers/signupController");

signupRoute.route("/").post(signupController.postUser); // Adds a user.

// ordersRouter
// 	.route("/:orderId")
// 	.get(ordersController.getOrder) // GET a single order.
// 	.patch(ordersController.updateOrder) // UPDATE a single order.
// 	.delete(ordersController.deleteOrder); // DELETE a single order.

module.exports = signupRoute;
