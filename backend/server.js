const express = require("express");
const cors = require("cors");
require("dotenv").config({ override: true });

const connectDB = require("./config/db");
const passport = require("./config/passport");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const skillRoutes = require("./routes/skillRoutes");
const publicRoutes = require("./routes/publicRoutes");
const skillSwapRoutes = require("./routes/skillSwapRoutes");


const app = express();

/* ------------------ MIDDLEWARE ------------------ */
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

/* ------------------ DATABASE ------------------ */
connectDB();

/* ------------------ TEST ------------------ */
app.get("/", (req, res) => {
  res.send("SkillSwap Backend Running");
});

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/swaps", skillSwapRoutes);
app.use("/api/requests", requestRoutes);


/* ------------------ SERVER ------------------ */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
