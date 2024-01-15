const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }

    jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          message: "Forbidden",
          error: err.message,
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = authenticateToken;