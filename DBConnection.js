require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

module.exports = function () {
	try {
		mongoose.connect(MONGODB_CONNECTION_STRING);
		mongoose.connection.on("connected", () => {
			console.log("Connected to MongoDB Successfully.");
		});
		mongoose.connection.on("error", (error) => {
			console.log("An error ocurred while connecting to MongoDB");
			console.log("Error: ", error);
		});
	} catch (err) {
		console.log("Error: ", err);
	}
};
