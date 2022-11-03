const express = require("express");
const articlesRouter = express.Router();
const articlesController = require("../controllers/articlesController");

articlesRouter
	.route("/")
	.get(articlesController.getArticles) // GET a single order.
	.post(articlesController.postArticle); // Creates a new article.

// ordersRouter
// 	.route("/:orderId")
// 	.get(ordersController.getOrder) // GET a single order.
// 	.patch(ordersController.updateOrder) // UPDATE a single order.
// 	.delete(ordersController.deleteOrder); // DELETE a single order.

module.exports = articlesRouter;
