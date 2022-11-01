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
	username: {
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

	timestamp: Date,
	updated_at: Date,
});

UserSchema.pre("save", async function () {
	const user = this;
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
});

// Compare passed user password and correct password hash
UserSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const UsersModel = mongoose.model("users", UserSchema);

module.exports = UsersModel;
