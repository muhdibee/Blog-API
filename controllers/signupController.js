const moment = require("moment");
const { usersModel, generateToken } = require("../models/usersModel");

// Create a new user...............
async function postUser(req, res, next) {
	try {
		const body = req.body;
		const user = await usersModel.create({
			email: body.email,
			first_name: body.first_name,
			last_name: body.last_name,
			password: body.password,
			user_type: body.user_type,
			timestamp: moment().toDate(),
			updated_at: moment().toDate(),
		});
		const { _id, email, first_name, last_name, user_type } = user;
		const token = generateToken(_id, email, first_name, last_name, user_type);
		res.header("x-auth-token", token).status(200).json({ status: true, _id, email, first_name, last_name, user_type, token });
	} catch (err) {
		next({ status: 400, errDesc: err, message: "An error occurred, please check your inputs and try again." });
	}
}

module.exports = {
	postUser,
};
