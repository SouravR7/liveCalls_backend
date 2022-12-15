const mongoose = require("mongoose");
const { userSchema, eventSchema } = require("./schema");

//mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://Admin:Admin@cluster0.gg7ua.mongodb.net/RuleEngine?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection Established"))
  .catch((err) => console.log("error while connect !!", err));

const user_Collection = mongoose.model("user_Data", userSchema);
const event_Collection = mongoose.model("event_data", eventSchema);

exports.user_Collection = user_Collection;
exports.event_Collection = event_Collection;
