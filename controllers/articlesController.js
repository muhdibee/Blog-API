const moment = require("moment");
const { articlesModel } = require("../models/articlesModel");

// Create a new article...............
async function postArticle(req, res, next) {
	console.log("I am here.");

	try {
		const body = req.body;
		const wordCount = body.body.split(" ").length;

		const author = "musa.gmail.com";
		const read_count = 1;
		const reading_time = Math.ceil(wordCount / 200);

		const article = await articlesModel.create({
			title: body.title,
			description: body.description,
			body: body.body,
			author: author,
			read_count: read_count,
			reading_time: reading_time,
			tags: body.tags,
			timestamp: moment().toDate(),
			updated_at: moment().toDate(),
		});
		res.status(200).json({ status: true, article });
	} catch (err) {
		next({ status: 400, errDesc: err, message: "An error occurred, please check your inputs and try again." });
	}
}

module.exports = {
	postArticle,
};
