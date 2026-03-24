const express = require("express");
const router = express.Router();
const {
  updateAvailability,
  getAvailability
} = require("../controllers/availabilityController");

// PUT: update availability
router.put("/", updateAvailability);

// GET: fetch availability of a user
router.get("/:userId", getAvailability);

module.exports = router;