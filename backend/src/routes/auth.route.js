const express = require("express");
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

//Normal Routes
router.post("/signup", authController.registerUserController);
router.post("/login", authController.loginUserController);

//Protected Routes
router.post("/logout", authController.logoutUserController);
router.get("/getMe", authUser, authController.getMeController);

module.exports = router;
