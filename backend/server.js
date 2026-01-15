const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

// connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("SkillSwap Backend Running");
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));

app.use("/api/user", require("./routes/userRoutes"));

const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

app.use("/api/session", require("./routes/sessionRoutes"));

app.use("/api/skills", require("./routes/skillRoutes"));
