require("dotenv").config();
const express = require("express");
const connectToMongoDB = require("./DBConnection");

const app = express();
const port = process.env.PORT || 3000;

//Connect to MongoDB.
connectToMongoDB();

app.get("/", (req, res) => {
	res.json({ status: true, message: "Welcome to Blog" });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});
