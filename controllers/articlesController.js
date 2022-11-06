const moment = require("moment");
const { articlesModel } = require("../models/articlesModel");

// Create a new article.
async function postArticle(req, res, next) {
	try {
		const author = req.user.email;
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

// Get all articles.
async function getArticles(req, res, next) {
	try {
		const articles = await articlesModel.find({ state: "published" });
		res.status(200).json({ status: true, articles });
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again." });
	}
}
// Get author's articles.
async function getUserArticles(req, res, next) {
	try {
		const user = req.user.email;
		const { state } = req.query;

		if (state) {
			const articles = await articlesModel.find({ state, author: user });
			return res.status(200).json({ status: true, articles });
		}

		const articles = await articlesModel.find({ author: user });
		return res.status(200).json({ status: true, articles });
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again." });
	}
}

// GET a single Article by ID.
async function getArticle(req, res, next) {
	try {
		const { articleId } = req.params;
		const article = await articlesModel.findOne({ _id: articleId, state: "published" });

		if (!article) {
			return res.status(404).json({ status: false, message: "There is no published article with the provided ID." });
		}
		article.read_count = article.read_count + 1;
		article.save().then(() => res.status(200).json({ status: true, article }));
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again." });
	}
}

// UPDATE an article by ID.
async function updateArticle(req, res, next) {
	try {
		const { articleId } = req.params;
		const user = req.user.email;
		const { title, description, body, state, tags, someVal } = req.body;
		const article = await articlesModel.findById(articleId);

		if (!article) {
			return res.status(404).json({ status: false, message: `Can not find article with ID: ${articleId}` });
		}

		if (user !== article.author) {
			return res.status(401).json({ status: false, message: "You are not authorized to edit this article." });
		}

		article.title = title;
		article.description = description;
		article.body = body;
		article.state = state;
		article.tags = tags;
		article.updated_at = moment().toDate();

		article
			.save()
			.then(() => res.status(200).json({ status: true, article }))
			.catch((err) => next({ status: 500, errDesc: err, message: err._message }));
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again later." });
	}
}

// UPDATE an article state by ID.
async function updateArticleState(req, res, next) {
	try {
		const { articleId } = req.params;
		const user = req.user.email;
		const body = req.body;
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

// DELETE an article by ID.
async function deleteArticle(req, res, next) {
	try {
		const { articleId } = req.params;
		const user = req.user.email;
		const article = await articlesModel.findById(articleId);

		if (!article) {
			return res.status(404).json({ status: false, message: `Can not find article with ID: ${articleId}` });
		}

		if (user !== article.author) {
			return res.status(401).json({ status: false, message: "You are not authorized to edit this article." });
		}

		articlesModel.findByIdAndDelete(articleId, (err, doc) => {
			if (err) {
				return res.status(404).json({ status: false, message: err._message });
			}
			res.status(200).json({ status: true, article_deleted: doc });
		});
	} catch (err) {
		next({ status: 500, errDesc: err, message: "An error occurred, please try again." });
	}
}

module.exports = {
	postArticle,
	getArticles,
	getArticle,
	getUserArticles,
	updateArticle,
	updateArticleState,
	deleteArticle,
};
