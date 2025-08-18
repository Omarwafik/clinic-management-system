const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const doctorsRoutes = require("./routes/doctors");
const usersRoutes = require("./routes/users");
const reservationsRoutes = require("./routes/reservations");
const messagesRoutes = require("./routes/messages");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // هنا السماح للـ frontend
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/doctors", doctorsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/messages", messagesRoutes);


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => console.log(err));
