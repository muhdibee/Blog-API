const express = require("express");
const articlesRouter = express.Router();
const articlesController = require("../controllers/articlesController");
const auth = require("../middlewares/auth");

articlesRouter
	.route("/")
	.get(articlesController.getArticles) // GET a single order.
	.post(auth, articlesController.postArticle); // Creates a new article.

articlesRouter
	.route("/:articleId")
	.get(articlesController.getArticle) // GET a single order.
	.patch(auth, articlesController.updateArticle) // UPDATE a single order.
	.delete(auth, articlesController.deleteArticle); // DELETE a single order.

module.exports = articlesRouter;
