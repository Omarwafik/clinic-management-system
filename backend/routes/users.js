const express = require("express");
const User = require("../models/User");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// إعداد التخزين للصور
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/users/"); // يخزن الصور في فولدر اسمه uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // اسم مميز للصورة
  },
});
const uploadDir = "uploads/users";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// const upload = multer({ storage });

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// ✅ GET كل اليوزرز
router.get("/", async (req, res) => {
  console.log("📢 /api/users GET called");
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST يوزر جديد
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ POST رفع صورة avatar
router.post("/upload-avatar/:id", (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/users/${req.file.filename}`;

    try {
      const user = await User.findByIdAndUpdate(req.params.id, { avatar: fileUrl }, { new: true });
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating avatar", error: error.message });
    }
  });
});

router.post("/remove-avatar/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { avatar: null },
      { new: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to remove avatar",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // دور على اليوزر
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ لو عايز تعمل تشفير هتستخدم bcrypt.compare هنا
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ هنا بترجع البيانات المطلوبة + _id
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ رجّع _id مع باقي البيانات
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
