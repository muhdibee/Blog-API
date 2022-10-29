require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JWT_SECRET = process.env.JWT_SECRET;

const UserSchema = new Schema({
	user_id: Schema.Types.ObjectId,
	email: {
		type: String,
		unique: [true, "Username must be unique."],
		required: [true, "Username is required."],
		trim: true,
	},
	first_name: {
		type: String,
		required: [true, "First name is required."],
		trim: true,
	},
	last_name: {
		type: String,
		required: [true, "Last name is required."],
		trim: true,
	},

	password: {
		type: String,
		required: [true, "Username is required."],
		trim: true,
	},

	created_at: Date,
	updated_at: Date,
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
