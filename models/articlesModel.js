const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticlesSchema = new Schema({
	title: {
		type: String,
		required: [true, "title is required."],
		unique: [true, "title must be unique."],
		minLength: 20,
		trim: true,
	},
	description: {
		type: String,
		required: [true, "description is required."],
		unique: [true, "description must be unique."],
		trim: true,
	},
	body: {
		type: String,
		required: [true, "body is required."],
		unique: [true, "body must be unique."],
		trim: true,
	},

	author: {
		type: String,
		required: [true, "author is required."],
		unique: [true, "author must be unique."],
		trim: true,
	},
	author_username: {
		type: String,
		required: [true, "author_username is required."],
		unique: [true, "author_username must be unique."],
		trim: true,
	},

	state: {
		type: String,
		enum: ["draft", "published"],
	},
	read_count: {
		type: Array,
	},
	reading_time: {
		type: Number,
		default: 0,
	},
	tags: {
		type: Array,
	},
	timestamp: Date,
	updated_at: Date,
});

const ArticlesModel = mongoose.model("articles", ArticlesSchema);

module.exports = ArticlesModel;
