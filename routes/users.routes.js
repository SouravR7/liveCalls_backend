let express = require("express");
let router = express.Router();
let user = require("../services/users.services");

router.route("/login").post(user.login);
router.route("/register").post(user.createUser);
router.route("/applyEvent").post(user.eventApply);
router.route("/userEvent").post(user.getUserEvent);
router.route("/getAppliedEvents").post(user.getAppliedEvents);
//getAllAdmin

module.exports = router;
