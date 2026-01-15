const express = require("express");
const router = express.Router();

const { getPublicProfile } = require("../controllers/publicController");

router.get("/users/:id", getPublicProfile);

module.exports = router;
