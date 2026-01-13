const Skill = require("../models/Skill");

/**
 * Add new skill
 */
exports.createSkill = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Skill name is required" });
    }

    const existing = await Skill.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Skill already exists" });
    }

    const skill = await Skill.create({ name });

    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all skills
 */
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ name: 1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
