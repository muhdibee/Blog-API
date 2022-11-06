const express = require("express");
const signupRoute = express.Router();
const signupController = require("../controllers/signupController");

signupRoute.route("/").post(signupController.postUser); // Adds a user.

module.exports = signupRoute;
