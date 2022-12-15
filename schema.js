const { Schema, mongoose } = require("mongoose");
//admin_id -> 1 : super_admin , 2 : admin

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
});

exports.userSchema = userSchema;
