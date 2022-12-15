const { Schema, mongoose } = require("mongoose");
//admin_id -> 1 : super_admin , 2 : admin

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  applied: [{ id: String }],
});

const eventSchema = new Schema({
  image: String,
  title: String,
  description: String,
  players: Number,
  date: String,
  organizer_id: String,
  sports_type: String,
});

exports.userSchema = userSchema;
exports.eventSchema = eventSchema;
