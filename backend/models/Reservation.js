// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  patient: { type: String, required: true }, // ممكن تخليه userId بدل الاسم لو عايز تربطه بـ Users
  email: { type: String, required: true },
  phone: String,
  date: { type: String, required: true }, // ممكن Date بس إنت كاتبها "YYYY-MM-DD"
  time: { type: String, required: true },
  pet: String,
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  doctorName: String
});

module.exports = mongoose.model("Reservation", reservationSchema);
