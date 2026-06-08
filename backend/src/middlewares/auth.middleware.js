const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  // Prefer Authorization header when it uses the Bearer scheme
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else {
    token = req.cookies?.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Token required" });
  }

  const isBlacklisted = await tokenBlackListModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Token revoked" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { authUser };
