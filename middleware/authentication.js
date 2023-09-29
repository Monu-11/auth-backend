const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized User" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
