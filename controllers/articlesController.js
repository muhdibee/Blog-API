const e = require("express");
const moment = require("moment");
const { articlesModel } = require("../models/articlesModel");
const { usersModel } = require("../models/usersModel");

// Create a new article...............
async function postArticle(req, res, next) {
	try {
		const author = req.user.email;
		console.log("author", author);
		const body = req.body;

		const article = await articlesModel.create({
			title: body.title,
			description: body.description,
			body: body.body,
			author: author,
			tags: body.tags,
			timestamp: moment().toDate(),
			updated_at: moment().toDate(),
		});
		res.status(200).json({ status: true, article });
	} catch (err) {
		next({ status: 400, errDesc: err, message: "An error occurred, please check your inputs and try again." });
	}
}

// Get all articles...............
async function getArticles(req, res, next) {
	try {
		const articles = await articlesModel.find({});
		res.status(200).json({ status: true, articles });
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again later." });
	}
}

// GET a single Article by Id.
async function getArticle(req, res, next) {
	try {
		const { articleId } = req.params;
		const article = await articlesModel.findById(articleId);

		if (!article) {
			return res.status(404).json({ status: false, article: null });
		}
		article.read_count = article.read_count + 1;
		article.save().then(() => res.status(200).json({ status: true, article }));
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again later." });
	}
}

async function updateArticle(req, res, next) {
	try {
		const { articleId } = req.params;
		const user = req.user.email;
		const body = req.body;
		console.log("I am here body: ", body);
		const article = await articlesModel.findById(articleId);

		if (!article) {
			return res.status(404).json({ status: false, message: `Can not find article with ID: ${articleId}` });
		}

		if (user !== article.author) {
			return res.status(401).json({ status: false, message: "You are not authorized to edit this article." });
		}

		article.state = body.state;
		article
			.save()
			.then(() => res.status(200).json({ status: true, article }))
			.catch((err) => next({ status: 500, errDesc: err, message: err._message }));
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again later." });
	}
}

async function deleteArticle() {
	return;
}

module.exports = {
	getArticles,
	postArticle,
	getArticle,
	updateArticle,
	deleteArticle,
};
