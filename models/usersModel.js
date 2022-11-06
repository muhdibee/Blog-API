require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JWT_SECRET = process.env.JWT_SECRET;

// Create the user schema.
const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email must be unique."],
		required: [true, "Email is required."],
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
	user_type: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
	},
	timestamp: Date,
	updated_at: Date,
});

// Hash the password before saving to DB.
UserSchema.pre("save", async function () {
	const user = this;
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
});

// Compare passed user password and correct hashed password.
UserSchema.methods.isValidPassword = async function (password) {
	const match = await bcrypt.compare(password, this.password);
	return match;
};

// Create the user model.
const usersModel = mongoose.model("users", UserSchema);

// This generateToken() function is called in the signup and login controller to generate token for a user.
function generateToken(_id, email, first_name, last_name, user_type) {
	return jwt.sign({ _id, email, first_name, last_name, user_type }, JWT_SECRET, { expiresIn: "1h" });
}

// Export usersModel and generateToken() function.
module.exports = {
	usersModel,
	generateToken,
};
