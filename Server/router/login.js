const express = require("express");
const loginController = require("../controller/login");
const router = express.Router();

router.post("/login", loginController.postLogin);
router.post("/signup", loginController.postSignUp);
router.post("/signupAdmin", loginController.postSignUpAdmin);

module.exports = router;
