const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/loginController");

loginRouter.route("/").post(loginController.loginUser); // Login a user.

// ordersRouter
// 	.route("/:orderId")
// 	.get(ordersController.getOrder) // GET a single order.
// 	.patch(ordersController.updateOrder) // UPDATE a single order.
// 	.delete(ordersController.deleteOrder); // DELETE a single order.

module.exports = loginRouter;
