const express = require("express");
const articlesRouter = express.Router();
const articlesController = require("../controllers/articlesController");
const { auth } = require("../middlewares/auth");

articlesRouter
	.route("/")
	.get(articlesController.getArticles) // GET articles.
	.post(auth, articlesController.postArticle); // Creates a new article.

articlesRouter.route("/user_articles").get(auth, articlesController.getUserArticles); // GET articles.
articlesRouter
	.route("/:articleId")
	.get(articlesController.getArticle) // GET a single article.
	.put(auth, articlesController.updateArticle) // UPDATE a single article.
	.patch(auth, articlesController.updateArticleState) // UPDATE a single article state by it's ID.
	.delete(auth, articlesController.deleteArticle); // DELETE a single article.

module.exports = articlesRouter;
