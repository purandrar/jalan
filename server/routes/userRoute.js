const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const verifyGoogle = require("../middleware/verifyGoogle");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/edit", userController.updates);

module.exports = router;
