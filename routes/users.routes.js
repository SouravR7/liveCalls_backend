let express = require("express");
let router = express.Router();
let user = require("../services/users.services");

router.route("/login").post(user.login);
router.route("/register").post(user.createUser);
router.route("/applyEvent").post(user.eventApply);
//getAllAdmin

module.exports = router;
