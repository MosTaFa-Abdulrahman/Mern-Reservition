const jwt = require("jsonwebtoken");

// Genrate Token
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not auth ~!");

  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) return res.status(403).json("Token is not valid ~!");
    req.user = user;
    next();
  });
};

// Verify User
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else return res.status(403).json("You are not authorized (User) ~!");
  });
};

// Verify Admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else return res.status(403).json("You are not authorized (Admin) ~!");
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
