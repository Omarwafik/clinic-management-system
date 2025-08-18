// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // admin عنده password، patients ممكن يسيبوها فاضية لو login مش مطلوب
  phone: String,
  role: { type: String, enum: ["admin", "patient"], default: "patient" },
  avatar: String
});

module.exports = mongoose.model("User", userSchema);
