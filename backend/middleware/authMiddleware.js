const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("Authorization");

  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = { id: decoded.id };   // <-- IMPORTANT
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
