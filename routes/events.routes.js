let express = require("express");
let router = express.Router();
let events = require("../services/events.services");

router.route("/create").post(events.createEvent);
router.route("/allEvents").get(events.getAllEvents);

//getAllAdmin

module.exports = router;
