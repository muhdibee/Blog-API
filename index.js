require("dotenv").config();
// const logger = require("morgan");
const express = require("express");
const connectToMongoDB = require("./DBConnection");
const signupRouter = require("./routes/signupRoute");
const loginRouter = require("./routes/loginRoute");
const articlesRouter = require("./routes/articlesRoute");

const app = express();
const port = process.env.PORT || 3000;

//Connect to MongoDB.
connectToMongoDB();

// App middlewares.
app.use(express.json());
app.use(logger("dev"));

// Route middlewares.
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/articles", articlesRouter);

// GET API home.
app.get("/", (req, res) => {
	res.status(200).json({ status: true, message: "Welcome to Blog-API." });
});

// App error handler.
app.use((err, req, res, next) => {
	console.log("Error: ", err.errDesc);
	res.status(err.status).json({ status: false, message: err.message });
});

// App listen on a port.
app.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});

// Export the server for testing purposes.
module.exports = app;
