const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  name: { type: String, required: true },
  jobTitle: String,
  specialization: String,
  image: String,
  qualifications: String,
  experienceYears: Number,
  bio: String,
  phone: String,
  email: String,
  workingHours: String,
  location: String,
  googleMaps: String,
  languages: [String],
  services: [String],
  rating: Number
});

module.exports = mongoose.model("Doctor", doctorSchema);
