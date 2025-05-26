const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const extractedToken = token.split(" ")[1];
    if (!extractedToken)
      return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;
