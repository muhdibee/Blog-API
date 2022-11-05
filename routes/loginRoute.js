const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/loginController");

loginRouter.route("/").post(loginController.loginUser); // Login a user.

module.exports = loginRouter;
