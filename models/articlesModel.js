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

	state: {
		type: String,
		default: "draft",
		enum: ["draft", "published"],
	},
	read_count: {
		type: Number,
	},
	reading_time: {
		type: Number,
		default: 0,
	},
	tags: {
		type: Array,
		default: [],
	},
	timestamp: Date,
	updated_at: Date,
});

const articlesModel = mongoose.model("articles", ArticlesSchema);

module.exports = { articlesModel };
