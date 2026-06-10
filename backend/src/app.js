const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authenticationRoutes = require("./routes/auth.route");
const audioRoutes = require("./routes/audio.route");
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser()); //Now server can access cookies.

app.use("/api/auth", authenticationRoutes);
app.use("/api/audio", audioRoutes);
module.exports = app;
