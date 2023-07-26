const mongoose = require("mongoose");
mongoose.pluralize(null);
const UsersScheme = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uid: { type: Number, require: true },
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
});
module.exports = mongoose.model("User", UsersScheme);
