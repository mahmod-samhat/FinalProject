const mongoose = require("mongoose");
const User = require("./user");
var options = { discriminatorKey: "kind", timestamps: true };

const adminSchema = new mongoose.Schema({}, options);
User.discriminator("Admin", adminSchema);
module.exports = mongoose.model("Admin");
