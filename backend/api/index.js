const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

const doctorsRoutes = require("../routes/doctors");
const usersRoutes = require("../routes/users");
const reservationsRoutes = require("../routes/reservations");
const messagesRoutes = require("../routes/messages");

dotenv.config();

const app = express();
app.use(express.json());

// routes
app.use("/doctors", doctorsRoutes);
app.use("/users", usersRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/messages", messagesRoutes);

// connect DB (once only)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

module.exports = app;
module.exports.handler = serverless(app);
