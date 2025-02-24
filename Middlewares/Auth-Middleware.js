const jwt = require("jsonwebtoken");
class AuthMiddleware {
  constructor() {
    this.auth_check = (req, res, next) => {
      if (!req.headers.authorization) {
        return res
          .status(401)
          .json({ message: "Authorization header is missing" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
          if (err) {
            return res.status(403).json({ message: "Invalid token" });
          }
          req.decoded_details = decodedToken;
          next();
        }
      );
    };
    this.check_if_admin = (req, res, next) => {
      const { role } = req.decoded_details;
      if (role !== "admin") {
        return res.status(403).json({ message: "You are not an admin" });
      }
      next();
    };
  }
}
module.exports = AuthMiddleware;
