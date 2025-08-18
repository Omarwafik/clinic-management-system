const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Storage and upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/doctors/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadDoctors = multer({ storage });

// Add new doctor with image
router.post("/", uploadDoctors.single("image"), async (req, res) => {
  try {
    const defaultImagePath = "/uploads/doctors/default.jpg"; // placeholder image

    const services = req.body.services
      ? JSON.parse(req.body.services)
      : ["Pet Health Checkups", "Vaccinations", "Pet Nutrition Consultation"];
    const languages = req.body.languages
      ? JSON.parse(req.body.languages)
      : ["Arabic", "English", "German"];

    const doctor = new Doctor({
      name: req.body.name,
      email: req.body.email,
      jobTitle: req.body.jobTitle,
      phone: req.body.phone,
      image: req.file
        ? `/uploads/doctors/${req.file.filename}`
        : defaultImagePath,
      specialization: req.body.specialization || "General Pet Care",
      qualifications:
        req.body.qualifications || "DVM, Diploma in Veterinary Medicine",
      experienceYears: req.body.experienceYears || 13,
      bio:
        req.body.bio ||
        "Experienced in comprehensive pet care including cats, dogs, and small mammals.",
      workingHours:
        req.body.workingHours || "Saturday - Wednesday: 1:00 PM - 7:00 PM",
      location: req.body.location || "Cairo, Egypt",
      googleMaps:
        req.body.googleMaps || "https://maps.google.com/?q=30.0619,31.2197",
      rating: req.body.rating || 2.5,
      services,
      languages,
    });

    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add doctor" });
  }
});
// Update doctor
router.put("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete doctor
router.delete("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ success: true, message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
