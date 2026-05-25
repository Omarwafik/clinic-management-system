const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");

const doctorsRoutes = require("./routes/doctors");
const usersRoutes = require("./routes/users");
const reservationsRoutes = require("./routes/reservations");
const messagesRoutes = require("./routes/messages");

dotenv.config();
const app = express();

// ✅ CORS
app.use(
  cors({
    origin: [
      "https://clinic-management-system-d9b4.vercel.app",
      "https://clinic-management-system.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

// ✅ Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Routes
app.use("/api/doctors", doctorsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/messages", messagesRoutes);

// ✅ Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Export app for Vercel
module.exports = app;
module.exports.handler = serverless(app);
