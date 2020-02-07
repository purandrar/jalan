const express = require("express");
const router = express.Router();
const routeEvent = require("./eventRoute");
const routeUser = require("./userRoute");
const verifyGoogle = require("../middleware/verifyGoogle");
const authentication = require("../middleware/authentication");
const usercontroller = require("../controllers/usercontroller");

router.use("/user", routeUser);
router.use("/googleLogin", verifyGoogle, usercontroller.googleLogin);
//router.use(authentication)
router.use("/event", routeEvent);

module.exports = router;
