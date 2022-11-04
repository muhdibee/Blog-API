require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
	try {
		const token = req.header("x-auth-token");
		if (!token) {
			return next({ status: 400, message: "Token is required." });
		}
		const decodedUser = jwt.verify(token, JWT_SECRET);
		req.user = decodedUser;
		console.log(req.user);
		next();
	} catch (err) {
		next({ status: 401, message: "Unauthorized." });
	}
};

module.exports = auth;
