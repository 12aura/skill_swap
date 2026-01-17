const express = require("express");
const cors = require("cors");
// require("dotenv").config();
require("dotenv").config({ override: true });
const connectDB = require("./config/db");
// manshi
const skillSwapRoutes = require("./routes/skillSwapRoutes");
const passport = require("./config/passport");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
console.log("EMAIL_USER =", process.env.EMAIL_USER);

app.use(express.json());
app.use(cors());
app.use("/api/swaps", skillSwapRoutes);
app.use(express.json());

// connect DB
connectDB();
app.use(passport.initialize());
app.get("/", (req, res) => {
  res.send("SkillSwap Backend Running");
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
app.use("/api/swaps", skillSwapRoutes);

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/request", require("./routes/requestRoutes"));

const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

app.use("/api/session", require("./routes/sessionRoutes"));

app.use("/api/skills", require("./routes/skillRoutes"));

app.use("/api/public", require("./routes/publicRoutes"));

app.use("/api/public", require("./routes/publicRoutes"));

app.use("/api/requests", requestRoutes);


