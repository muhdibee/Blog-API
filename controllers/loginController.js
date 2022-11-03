const { usersModel, generateToken } = require("../models/usersModel");

async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw { status: 400, message: "email and password is required" };
		}
		const user = await usersModel.findOne({ email });
		if (!user) {
			throw { status: 400, message: "User not found." };
		}
		const match = await user.isValidPassword(password);
		if (!match) {
			throw { status: 400, message: "Incorrect email or password." };
		}
		const token = generateToken(user._id, user.email, user.first_name, user.last_name, user.user_type);
		res.header("x-auth-token", token).status(200).json({ status: true, _id: user._id, email: user.email, user_type: user.user_type, token });
	} catch (err) {
		next(err);
	}
}

module.exports = { loginUser };
