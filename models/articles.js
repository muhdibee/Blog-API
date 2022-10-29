const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	created_at: Date,
	state: { type: Number, default: 1 },
	total_price: Number,
	items: [
		{
			name: String,
			price: Number,
			size: { type: String, enum: ["s", "m", "l"] },
			quantity: Number,
		},
	],
});

const ArticlesModel = mongoose.model("Orders", ArticleSchema);

module.exports = ArticlesModel;
