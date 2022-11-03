require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const connectToMongoDB = require("./DBConnection");
const signupRouter = require("./routes/signupRoute");

const app = express();
const port = process.env.PORT || 3000;

//Connect to MongoDB.
connectToMongoDB();

app.use(express.json());
app.use(logger("dev"));

app.get("/", (req, res) => {
	res.json({ status: true, message: "Welcome to Blog-API." });
});

app.use("/api/signup", signupRouter);

// App error handler.
app.use((err, req, res, next) => {
	console.log("Error: ", err.errDesc);
	res.status(err.status).json({ status: false, message: err.message });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});
